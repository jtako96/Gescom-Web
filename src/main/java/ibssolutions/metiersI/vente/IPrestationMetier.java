package ibssolutions.metiersI.vente;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ibssolutions.dao.CompteRepository;
import ibssolutions.dao.DetailEcritureRepository;
import ibssolutions.dao.EcritureRepository;
import ibssolutions.dao.ExerciceRepository;
import ibssolutions.dao.JournalComptableRepository;
import ibssolutions.dao.MoisRepository;
import ibssolutions.dao.ParametreRepository;
import ibssolutions.dao.PrestationRepository;
import ibssolutions.dao.ScrussaleRepository;
import ibssolutions.dao.SousCompteRepository;
import ibssolutions.dao.StatutLivraisonRepository;
import ibssolutions.dao.TypePieceRepository;
import ibssolutions.dao.UserRepository;
import ibssolutions.entity.comptabilite.Compte;
import ibssolutions.entity.comptabilite.DetailEcriture;
import ibssolutions.entity.comptabilite.Ecriture;
import ibssolutions.entity.parametre.Exercice;
import ibssolutions.entity.parametre.Parametre;
import ibssolutions.entity.parametre.User;
import ibssolutions.entity.vente.Prestation;
import ibssolutions.metiers.vente.PrestationMetier;
import ibssolutions.utils.GetLoggers;

@Service @Transactional
public class IPrestationMetier implements PrestationMetier{
	
	@Autowired
	private PrestationRepository prestationRepository;
	

	@Autowired
	JournalComptableRepository journalRepository;
	
	@Autowired
	private ScrussaleRepository scrussaleRepository;
	
	@Autowired
	private UserRepository userrep;
	
	@Autowired
	private CompteRepository compteRepository;
	
	@Autowired
	private DetailEcritureRepository detailRepository;
	
	@Autowired
	SousCompteRepository sousCompteRepository;
	
	@Autowired
	MoisRepository moisRepository;
	
	@Autowired 
	TypePieceRepository typeRepository;
	
	@Autowired
	private EcritureRepository ecritureRepository ;
	
	@Autowired
	private ExerciceRepository exerciceRepository;
	
	@Autowired
	private ParametreRepository parametreRepository;
	
	@Autowired StatutLivraisonRepository statutLivraisonRepository;
	
	@Override
	public Prestation addPrestation(Prestation p, HttpSession httpsession) {
		
		Map<String, Object> recuperer =  GetLoggers.getUserLogger(httpsession);
		User users = userrep.findOne(recuperer.get("username").toString());
		
		Parametre pa = parametreRepository.findByPrestation();
		Exercice e = exerciceRepository.getExerciceTrue();
		p.setCode("PRES-"+e.getLibelle()+"-"+pa.getValeur());
		p.setStatutLivraison(statutLivraisonRepository.findOne(1L));
		p.setDatePrestation(new Date());
		p.setScrussale(scrussaleRepository.findOne(users.getIdScrussale()));
		p.setUsername(users.getUsername());
		p.setExercice(exerciceRepository.getExerciceTrue());
		pa.setValeur(pa.getValeur() +1 );
		parametreRepository.save(pa);
		
		return prestationRepository.save(p);
	}

	@Override
	public Prestation editePrestation(Long id) {
		
		return prestationRepository.findOne(id);
	}

	@Override
	public void deletePrestation(Long id) {
		prestationRepository.delete(id);
	}

	@Override
	public List<Prestation> prestationByScrussale(HttpSession httpSession) {
		
		Map<String, Object> recuperer =  GetLoggers.getUserLogger(httpSession);
		User users = userrep.findOne(recuperer.get("username").toString());
		
		return prestationRepository.listeByScrussale(users.getIdScrussale());
	}

	@Override
	public Prestation updatePrestation(Prestation p) {
		
		return prestationRepository.save(p);
	}

	@Override
	public boolean genererEcriture(Long idpres) {

		boolean resultat = false;
		Prestation v = prestationRepository.findOne(idpres);
		//Generer l'ecriture comptable pour la vente Prestations
		
		List<Ecriture> lecEcritures = ecritureRepository.findByPrestation(v.getId());
		if (lecEcritures.size() > 0) 
		{
			System.out.println("Ecriture déja généré pour cette prestation");
			resultat = false;
			
		}
		else 
		{
				
			Ecriture ecriture = new Ecriture();
			Parametre paecriture = parametreRepository.findByEcriture();
			ecriture.setCode("ECR-"+v.getExercice().getLibelle()+"-"+paecriture.getValeur());
			ecriture.setIntituleEcriture(v.getClient().getRaisonSocial()+", PRESTATION DE SERVICE");
			ecriture.setDateEcriture(new Date());
			ecriture.setExercice(v.getExercice());
			ecriture.setPrestation(v);
			ecriture.setMois(moisRepository.getMoisTrue());
			ecriture.setTotalCredit( v.getMontantTVA() + v.getMontantHT() );
			ecriture.setTotalDebit( v.getMontantTTC() );
			ecriture.setTypePiece(typeRepository.findOne(4L));
			ecriture.setScrussale(v.getScrussale());
			paecriture.setValeur(paecriture.getValeur() + 1 );
			ecriture.setJournalComptable(journalRepository.getJournalVente());
			parametreRepository.save(paecriture);
			Ecriture en = ecritureRepository.save(ecriture);
			
			//Elaboration des detailsf
			
			DetailEcriture detailEcriture = new DetailEcriture();
			
			detailEcriture.setDate(new Date());
			detailEcriture.setEcriture(en);
			detailEcriture.setMontantCredit(0);
			detailEcriture.setMontantDebit(en.getTotalDebit());
			detailEcriture.setSousCompte(sousCompteRepository.findOneByClient(en.getPrestation().getClient().getId()) );
			detailEcriture.setCompte(detailEcriture.getSousCompte().getCompte());
			detailEcriture.setLibelle(en.getPrestation().getCode()+" / "+en.getPrestation().getClient().getRaisonSocial());
			
			detailRepository.save(detailEcriture);
			// ***** Save Pour Le Compte TVA ***** //
            
			DetailEcriture detailEcriture2 = new DetailEcriture();
			
			detailEcriture2.setDate(new Date());
			detailEcriture2.setEcriture(en);
			detailEcriture2.setMontantCredit(en.getPrestation().getMontantTVA());
			detailEcriture2.setMontantDebit(0);
			
			//Requette pour renvoyer le compte TVA
			Compte cp = compteRepository.getCompteTVAPrestation();
			detailEcriture2.setCompte(cp);
			detailEcriture2.setSousCompte(sousCompteRepository.findOneSousCompteByCode(cp.getId()));
			detailEcriture2.setLibelle(en.getPrestation().getCode()+" /  TVA facturée sur service vendu");
			
			detailRepository.save(detailEcriture2);
			// ************************* FIN Save Pour Le Compte TVA ************************* //
			
			
			// ***** Save Pour Le Compte VENTE ***** //
			
			DetailEcriture detailEcriture3 = new DetailEcriture();
			
			detailEcriture3.setDate(new Date());
			detailEcriture3.setEcriture(en);
			detailEcriture3.setMontantCredit(en.getPrestation().getMontantHT());
			detailEcriture3.setMontantDebit(0);
			
			//Requette pour renvoyer le compte VENTE
			Compte cpt = compteRepository.getCompteServicevendu();
			detailEcriture3.setCompte(cpt);
			detailEcriture3.setSousCompte(sousCompteRepository.findOneSousCompteByCode(cpt.getId()));
			detailEcriture3.setLibelle(en.getPrestation().getCode()+"/ Service vendu");
			
			detailRepository.save(detailEcriture3);
				
			// ************************* FIN Save Pour Le Compte TVA ************************* //
			
			v.setEtatFacture(true);
			prestationRepository.save(v);
			resultat = true;
		}
		return resultat;
	}
}
