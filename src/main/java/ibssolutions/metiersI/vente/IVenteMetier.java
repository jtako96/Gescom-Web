package ibssolutions.metiersI.vente;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ibssolutions.dao.CompteRepository;
import ibssolutions.dao.DetailEcritureRepository;
import ibssolutions.dao.DetailProformaRepository;
import ibssolutions.dao.EcritureRepository;
import ibssolutions.dao.ExerciceRepository;
import ibssolutions.dao.JournalComptableRepository;
import ibssolutions.dao.MagasinRepository;
import ibssolutions.dao.MoisRepository;
import ibssolutions.dao.PanierRepository;
import ibssolutions.dao.ParametreRepository;
import ibssolutions.dao.ProformaRepository;
import ibssolutions.dao.VenteRepository;
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
import ibssolutions.entity.vente.DetailProforma;
import ibssolutions.entity.vente.Panier;
import ibssolutions.entity.vente.Proforma;
import ibssolutions.entity.vente.Vente;
import ibssolutions.metiers.vente.VenteMetier;
import ibssolutions.utils.GetLoggers;

@Service @Transactional
public class IVenteMetier implements VenteMetier {

	@Autowired
	private ProformaRepository proformaRepository;
	
	@Autowired
	private VenteRepository venteRepository;

	@Autowired
	private ParametreRepository parametreRepository;
	
	@Autowired
	private ExerciceRepository exerciceRepository;
	
	@Autowired
	ScrussaleRepository scrussaleRepository;
	
	@Autowired
	MagasinRepository magasinRepository;
	
	@Autowired
	MoisRepository moisRepository;
	
	@Autowired
	UserRepository userrep;
	
	@Autowired 
	TypePieceRepository typeRepository;
	
	@Autowired
	SousCompteRepository sousCompteRepository;
	
	@Autowired
	private EcritureRepository ecritureRepository ;
	
	@Autowired
	private CompteRepository compteRepository;
	
	@Autowired
	private DetailEcritureRepository detailRepository;
	
	@Autowired
	DetailProformaRepository detailProformaRepository;
	
	@Autowired
	PanierRepository panierRepository;
	
	@Autowired
	StatutLivraisonRepository statutLivraisonRepository;

	@Autowired
	JournalComptableRepository journalRepository;
	
	@Override
	public Vente addVente(Vente p,HttpSession httpsession) {
		
        Map<String, Object> recuperer =  GetLoggers.getUserLogger(httpsession);
		User users = userrep.findOne(recuperer.get("username").toString());
		
		Parametre pa = parametreRepository.findByVente();
		Exercice e = exerciceRepository.getExerciceTrue();
		p.setCode("FAV"+e.getLibelle()+"-"+pa.getValeur());
		p.setDateVente(new Date());
		p.setScrussale(scrussaleRepository.findOne(users.getIdScrussale()));
		p.setUsername(users.getUsername());
		p.setExercice(exerciceRepository.getExerciceTrue());
		pa.setValeur(pa.getValeur() +1 );
		p.setStatutLivraison(statutLivraisonRepository.getStatutLivraisonNonLivrer());
		parametreRepository.save(pa);
		
		return venteRepository.save(p);
		
	}

	@Override
	public Vente editeVente(Long id) {
		
		return venteRepository.findOne(id);
	}

	@Override
	public void deleteVente(Long id) {
		venteRepository.delete(id);
	}

	@Override
	public List<Vente> ventetByScrussale(HttpSession httpSession) {

        Map<String, Object> recuperer =  GetLoggers.getUserLogger(httpSession);
		User users = userrep.findOne(recuperer.get("username").toString());
		
		return venteRepository.listeVenteScrussal(scrussaleRepository.findOne(users.getIdScrussale()));
	}

	@Override
	public Vente updateVente(Vente p) {
		System.out.println("dsjdhjslfvdfv///////////////////");
		return venteRepository.save(p);
	}

	@Override
	public boolean genererVente(Long idproforma) {
		
		boolean resultat = false ;
		
		//Recuperer un proformat
	    Proforma proforma =	proformaRepository.findOne(idproforma);
	    
	    //Verifier si le proforma existe
	    List<Vente> Lvente = venteRepository.findAllByExercice(proforma);
	    
	    if (Lvente.size() != 0) 
	    {
			resultat = false;
		}
	    else 
	    {
	    	//Enregistre la vente
	    	
			Vente v = new Vente();
			Parametre pa = parametreRepository.findByVente();
			Exercice e = exerciceRepository.getExerciceTrue();
			v.setCode("FAV"+e.getLibelle()+"-"+pa.getValeur());
			v.setDateVente(new Date());
			v.setScrussale(proforma.getScrussale());
			v.setUsername(proforma.getUsername());
			v.setExercice(exerciceRepository.getExerciceTrue());
			v.setProforma(proforma);
			v.setModalitePaiement(proforma.getModalitePaiement());
			v.setGarantie(proforma.getGarantie());
			v.setDelaiLivraison(proforma.getDelaiLivraison());
			v.setMontantHT(proforma.getMontantHT());
			v.setMontantTTC(proforma.getMontantTTC());
			v.setMontantTVA(proforma.getMontantTVA());
			v.setMontantRemise(proforma.getMontantRemise());
			v.setMontantRemise(proforma.getRemise());
			v.setEtatFacture(true);
			v.setStatutLivraison(statutLivraisonRepository.findOne(1L));
			v.setClient(proforma.getClient());
			pa.setValeur(pa.getValeur() + 1 );
			parametreRepository.save(pa);
			
			venteRepository.save(v);
			
			//Enregistre les details de la ventes
			List<DetailProforma> Ldetailproforma = detailProformaRepository.listpanierProforma(proforma);
			
			for (DetailProforma dp : Ldetailproforma) 
			{
				System.out.println("============DEBUT OPERATION DE DETAILS PANIER");
				Panier panier = new Panier();
				panier.setDescription(dp.getDescription());
				panier.setMontantHT(dp.getMontantHT());
				panier.setMontantRemise(dp.getMontantRemise());
				panier.setMontantTTC(dp.getMontantTTC());
				panier.setMontantTVA(dp.getMontantTVA());
				panier.setPrixUnitaire(dp.getPrixUnitaire());
				panier.setRemise(dp.getRemise());
				panier.setQuantite(dp.getQuantite());
				panier.setReference(dp.getReference());
				panier.setStock(dp.getStock());
				panier.setProforma(proforma);
				panier.setVente(v);
				
				panierRepository.save(panier);
			}
			
			// ***********************************************************************//
			// ****** GENERER L'ECRITURE COMPTABLE POUR LA VENTE DES ARTICLE******  //
			// ***********************************************************************//
			
		List<Ecriture> lecEcritures = ecritureRepository.findByVente(v.getId());
		if (lecEcritures.size() > 0) 
		{
			System.out.println("Ecriture déja généré");
			resultat = false;
		}
		else 
		{
				
			Ecriture ecriture = new Ecriture();
			Parametre paecriture = parametreRepository.findByEcriture();
			ecriture.setCode("ECR-"+v.getExercice().getLibelle()+"-"+paecriture.getValeur());
			ecriture.setIntituleEcriture(v.getClient().getRaisonSocial()+", VENTES DE MARCHANDISES");
			ecriture.setDateEcriture(new Date());
			ecriture.setExercice(v.getExercice());
			ecriture.setVente(v);
			ecriture.setScrussale(v.getScrussale());
			ecriture.setMois(moisRepository.getMoisTrue());
			ecriture.setTotalCredit( v.getMontantTVA() + v.getMontantHT() );
			ecriture.setTotalDebit( v.getMontantTTC() );
			ecriture.setTypePiece(typeRepository.findOne(1L));
			ecriture.setJournalComptable(journalRepository.getJournalVente());
			paecriture.setValeur(paecriture.getValeur() + 1 );
			parametreRepository.save(paecriture);
			Ecriture en = ecritureRepository.save(ecriture);
			
			//Elaboration des details
			
			DetailEcriture detailEcriture = new DetailEcriture();
			
			detailEcriture.setDate(new Date());
			detailEcriture.setEcriture(en);
			detailEcriture.setMontantCredit(0);
			detailEcriture.setMontantDebit(en.getTotalDebit());
			detailEcriture.setSousCompte(sousCompteRepository.findOneByClient(en.getVente().getClient().getId()) );
			detailEcriture.setCompte(detailEcriture.getSousCompte().getCompte());
			detailEcriture.setSens("D");
			detailEcriture.setLibelle(en.getVente().getCode()+" / "+en.getVente().getClient().getRaisonSocial());
			
			detailRepository.save(detailEcriture);
			// ***** Save Pour Le Compte TVA ***** //
            
			DetailEcriture detailEcriture2 = new DetailEcriture();
			
			detailEcriture2.setDate(new Date());
			detailEcriture2.setEcriture(en);
			detailEcriture2.setMontantCredit(en.getVente().getMontantTVA());
			detailEcriture2.setMontantDebit(0);
			detailEcriture2.setSens("C");
			
			//Requette pour renvoyer le compte TVA
			Compte cp = compteRepository.getCompteTVA();
			detailEcriture2.setCompte(cp);
			detailEcriture2.setSousCompte(sousCompteRepository.findOneSousCompteByCode(cp.getId()));
			detailEcriture2.setLibelle(en.getVente().getCode()+" / TVA facturée sur vente");
			
			detailRepository.save(detailEcriture2);
			// ************************* FIN Save Pour Le Compte TVA ************************* //
			
			
			// ***** Save Pour Le Compte VENTE ***** //
			
			DetailEcriture detailEcriture3 = new DetailEcriture();
			
			detailEcriture3.setDate(new Date());
			detailEcriture3.setEcriture(en);
			detailEcriture3.setMontantCredit(en.getVente().getMontantHT());
			detailEcriture3.setMontantDebit(0);
			detailEcriture3.setSens("C");
			
			//Requette pour renvoyer le compte VENTE
			Compte cpt = compteRepository.getCompteVENTE();
			detailEcriture3.setCompte(cpt);
			detailEcriture3.setSousCompte(sousCompteRepository.findOneSousCompteByCode(cpt.getId()));
			detailEcriture3.setLibelle(en.getVente().getCode()+"/ Ventes de Marchandise");
			
			detailRepository.save(detailEcriture3);
				
			// ************************* FIN Save Pour Le Compte TVA ************************* //
			
		}
			
			
			proforma.setEtatFacture(true);
			proformaRepository.save(proforma);
			resultat = true;
			
		}
	    
		return resultat;
	}

	@Override
	public boolean genererEcriture(Long idvente,HttpSession httpsession) {

	    Map<String, Object> recuperer =  GetLoggers.getUserLogger(httpsession);
			User users = userrep.findOne(recuperer.get("username").toString());
			
		boolean resultat = false;  
		Vente v = venteRepository.findOne(idvente);
		//Generer l'ecriture comptable pour la vente
		System.out.println("******************DEBUT POUR LA GENERATION DES VENTES **********************");
		List<Ecriture> lecEcritures = ecritureRepository.findByVente(v.getId());
		if (lecEcritures.size() > 0) 
		{
			System.out.println("Ecriture déja généré");
			 resultat = false;
		}
		else 
		{
				
			Ecriture ecriture = new Ecriture();
			Parametre paecriture = parametreRepository.findByEcriture();
			ecriture.setCode("ECR-"+v.getExercice().getLibelle()+"-"+paecriture.getValeur());
			ecriture.setIntituleEcriture(v.getClient().getRaisonSocial()+", VENTES DE MARCHANDISES");
			ecriture.setScrussale( scrussaleRepository.findOne(users.getIdScrussale()) );
			ecriture.setDateEcriture(new Date());
			ecriture.setExercice(v.getExercice());
			ecriture.setVente(v);
			ecriture.setMois(moisRepository.getMoisTrue());
			ecriture.setTotalCredit( v.getMontantTVA() + v.getMontantHT() );
			ecriture.setTotalDebit( v.getMontantTTC() );
			ecriture.setTypePiece(typeRepository.findOne(1L));
			paecriture.setValeur(paecriture.getValeur() + 1 );
			ecriture.setJournalComptable(journalRepository.getJournalVente());
			parametreRepository.save(paecriture);
			Ecriture en = ecritureRepository.save(ecriture);
			
			//Elaboration des details
			
			DetailEcriture detailEcriture = new DetailEcriture();
			
			detailEcriture.setDate(new Date());
			detailEcriture.setEcriture(en);
			detailEcriture.setMontantCredit(0);
			detailEcriture.setMontantDebit(en.getTotalDebit());
			detailEcriture.setSousCompte(sousCompteRepository.findOneByClient(en.getVente().getClient().getId()) );
			detailEcriture.setCompte(detailEcriture.getSousCompte().getCompte());
			detailEcriture.setSens("D");
			detailEcriture.setLibelle(en.getVente().getCode()+" / "+en.getVente().getClient().getRaisonSocial());
			
			detailRepository.save(detailEcriture);
			// ***** Save Pour Le Compte TVA ***** //
            
			DetailEcriture detailEcriture2 = new DetailEcriture();
			
			detailEcriture2.setDate(new Date());
			detailEcriture2.setEcriture(en);
			detailEcriture2.setMontantCredit(en.getVente().getMontantTVA());
			detailEcriture2.setMontantDebit(0);
			detailEcriture2.setSens("C");
			
			//Requette pour renvoyer le compte TVA
			Compte cp = compteRepository.getCompteTVA();
			detailEcriture2.setCompte(cp);
			System.out.println(" LE COMPTE************** "+cp.getId());
			detailEcriture2.setSousCompte(sousCompteRepository.findOneSousCompteByCode(cp.getId()));
			System.out.println(" LE SOUS COMPTE************** "+sousCompteRepository.findOneSousCompteByCode(cp.getId()));
			detailEcriture2.setLibelle(en.getVente().getCode()+" / TVA prélevée");
			
			detailRepository.save(detailEcriture2);
			// ************************* FIN Save Pour Le Compte TVA ************************* //
			
			
			// ***** Save Pour Le Compte VENTE ***** //
			
			DetailEcriture detailEcriture3 = new DetailEcriture();
			
			detailEcriture3.setDate(new Date());
			detailEcriture3.setEcriture(en);
			detailEcriture3.setMontantCredit(en.getVente().getMontantHT());
			detailEcriture3.setMontantDebit(0);
			detailEcriture3.setSens("C");
			
			//Requette pour renvoyer le compte VENTE
			Compte cpt = compteRepository.getCompteVENTE();
			detailEcriture3.setCompte(cpt);
			detailEcriture3.setSousCompte(sousCompteRepository.findOneSousCompteByCode(cpt.getId()));
			detailEcriture3.setLibelle(en.getVente().getCode()+"/ Achat des Articles");
			
			detailRepository.save(detailEcriture3);
				
			// ************************* FIN Save Pour Le Compte TVA ************************* //
			
			v.setEtatFacture(true);
			venteRepository.save(v);
			resultat = true;
		}
		return resultat;
	}

	@Override
	public List<Vente> venteNonSolde(Long id) {
		return venteRepository.listeVentNonSolde(id);
	}

}
