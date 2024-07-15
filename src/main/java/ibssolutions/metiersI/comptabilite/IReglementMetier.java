package ibssolutions.metiersI.comptabilite;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ibssolutions.dao.ClientRepository;
import ibssolutions.dao.CompteRepository;
import ibssolutions.dao.DetailEcritureRepository;
import ibssolutions.dao.EcritureRepository;
import ibssolutions.dao.JournalComptableRepository;
import ibssolutions.dao.MoisRepository;
import ibssolutions.dao.ParametreRepository;
import ibssolutions.dao.ReglementRepository;
import ibssolutions.dao.SousCompteRepository;
import ibssolutions.dao.TypePieceRepository;
import ibssolutions.dao.VenteRepository;
import ibssolutions.entity.clientelle.Client;
import ibssolutions.entity.comptabilite.Compte;
import ibssolutions.entity.comptabilite.DetailEcriture;
import ibssolutions.entity.comptabilite.Ecriture;
import ibssolutions.entity.comptabilite.Reglement;
import ibssolutions.entity.comptabilite.Restitution;
import ibssolutions.entity.parametre.Parametre;
import ibssolutions.entity.vente.Vente;
import ibssolutions.metiers.comptabilite.ReglementMetier;
import ibssolutions.utils.StringUtils;


@Service @Transactional
public class IReglementMetier implements  ReglementMetier {

	@Autowired
	EcritureRepository ecritureRepository;
	
	@Autowired
	SousCompteRepository sousCompteRepository;
	
	@Autowired
	DetailEcritureRepository detailRepository;
	
	@Autowired
	private ReglementRepository reglementRepository;
	
	@Autowired
	private VenteRepository venteRepositry;
	
	@Autowired
	private ParametreRepository parametreRepository;
	
	@Autowired
	MoisRepository moisRepository;
		
	@Autowired
	CompteRepository compteRepository;
	
	@Autowired
	private ClientRepository clientRepository;
	
	@Autowired
	JournalComptableRepository journalRepository;
	
	@Autowired 
	TypePieceRepository typeRepository;
	
	
	@Override
	public Reglement addReglement(Reglement r) {
		
     	Parametre p = parametreRepository.findByReglement();
		r.setCode("REG"+""+StringUtils.genererCodeLogiciel(p.getValeur()));
		if (r.getDatePayement() == null) {
			r.setDatePayement(new Date());
		}
		p.setValeur(p.getValeur() + 1);
		parametreRepository.save(p);
		System.out.println("=**************= "+r.getVente().getId());
		Vente v = venteRepositry.findOne(r.getVente().getId());
		Client c = clientRepository.findOne(v.getClient().getId());
		c.setSoldeCrediteur(c.getSoldeCrediteur() + r.getMontantPayement());
		clientRepository.save(c);
		
				
		return reglementRepository.save(r);
	}

	@Override
	public Reglement editeReglement(Long id) {
		
		return reglementRepository.findOne(id);
	}

	@Override
	public void deleteReglement(Long id) {
		reglementRepository.delete(id);
		
	}

	@Override
	public List<Reglement> findAllOrdorlyByName() {
		
		return reglementRepository.findAll();
	}

	@Override
	public List<Reglement> findAllOrdorlyByDette(Long id) {
		
		return reglementRepository.findByDette(id);
	}

	@Override
	public Double renvoieMontantApayer(Long iddette) {
	     
		double montant_a_payer = 0;
	    Vente d = venteRepositry.findOne(iddette);
		Client c = clientRepository.findOne(d.getClient().getId());
		
		if ( d.isEtatReglement() == false && c !=null )
		{	
		    montant_a_payer = d.getMontantTTC();
		}
		else
		{
		    montant_a_payer =  d.getMontantTTC();
		    	
		}

		return montant_a_payer;
	}

	@Override
	public Double renvoieMontantPayer(Long iddette) {
	    
		double montant_payer = 0;
		 
		if ( reglementRepository.totalpayer(iddette) != null )
		{
			  montant_payer=reglementRepository.totalpayer(iddette);
		}
		else
		{
			  montant_payer = 0;
		}
	 
		return montant_payer;
	}

	@Override
	public int testervalidation(Long id, Double montant) {
		
		int test = 1;
		 
		Double	montant_courant = null;
	    montant_courant = renvoieMontantPayer(id) + montant;
	    
	    if ( (renvoieMontantApayer(id) - montant_courant) == 0 )
	    {
	    	  test = 2;	
	    }
	    ;
	    
	    if ( renvoieMontantApayer(id) > montant_courant )
	    {
	    	  test = 1;
	    };
	    
	    if ( renvoieMontantApayer(id) < montant_courant )
	    {
	    	  test = 3;
	    }
	    ;

		return test;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public Vector situationReglement(Long id) {
	   
		List<Vente> listedette = venteRepositry.findVente(id);
		 
	    java.util.Vector collection = new java.util.Vector();
       
	    double	totapayer = 0;
        double	totpayer  = 0;
        double	totrpayer = 0;
 
 
	    for (Vente ins: listedette)
	    {
		 
	        double apayer = renvoieMontantApayer(ins.getId());
		   
			double payer  = renvoieMontantPayer(ins.getId());
			 
			double rpayer= apayer - payer;
		 
			collection.add(new Restitution(venteRepositry.findOne(ins.getId()).getClient().getRaisonSocial(),"payement",apayer, payer, rpayer));
			
			 totapayer = totapayer + apayer;
			 totpayer  = totpayer  + payer;
			 totrpayer = totrpayer + rpayer;
		 
		
	    } 
	 
		 Map<String,Object> params2 = new HashMap<>();
		 params2.put("totapayer",totapayer);
		 params2.put("totpayer",totpayer);
		 params2.put("totrpayer",totrpayer);
		 collection.add(params2); 
 
	   return collection ;	
	}


	@Override
	public Map<String, Object> apayer_payer_rapayer(Long id1) {
		
		double apayer = renvoieMontantApayer(id1);
		double payer  = renvoieMontantPayer(id1);
		double rpayer = apayer - payer;
		
		Map<String, Double> params = new HashMap<>();
		 		
		Map<String,Object> params2 = new HashMap<>();
		
		
		params.put("apayer", apayer);
		params.put("payer",  payer);
		params.put("rpayer", rpayer);
 
		params2.put("client",venteRepositry.findOne(id1).getClient());
		params2.put("situation",params);
		
		return params2;
	}

	@Override
	public boolean generateEcritureRegBancaire( Long id) {
		boolean response = false;
		
		Reglement reg  = reglementRepository.findOne(id);
		
		List<Ecriture> Lecriture = ecritureRepository.findByReglement(reg);
		
		if (Lecriture.size() != 0) 
		{
			response = false;
			//Trouver Ecriture De la Vente En cours
			
			//List<DetailEcriture> Ldecriture = detailRepository.getDetailsByEcriture(ecritureRepository.getEcriture(reg.getVente()));
		}
		else 
		{
			Ecriture ecriture = new Ecriture();
			Parametre paecriture = parametreRepository.findByEcriture();
			ecriture.setCode("ECR-"+reg.getVente().getExercice().getLibelle()+"-"+paecriture.getValeur());
			ecriture.setIntituleEcriture(reg.getVente().getClient().getRaisonSocial()+",  REGLEMENT PAR BANQUE");
			ecriture.setDateEcriture(new Date());
			ecriture.setExercice(reg.getVente().getExercice());
			
			ecriture.setVente(reg.getVente());
			ecriture.setReglement(reg);
			ecriture.setScrussale(reg.getVente().getScrussale());
			ecriture.setMois(moisRepository.getMoisTrue());
			ecriture.setTotalCredit( reg.getMontantPayement() );
			ecriture.setTotalDebit( reg.getMontantPayement()  );
			
			ecriture.setTypePiece(typeRepository.findOne(3L));
			ecriture.setJournalComptable(journalRepository.getJournalTresorerie());
			paecriture.setValeur(paecriture.getValeur() + 1 );
			parametreRepository.save(paecriture);
			Ecriture en = ecritureRepository.save(ecriture);
			System.out.println("djkgsdhkvgk"+en.getId());
			
			//Compte DEBIT
			DetailEcriture detailEcriture = new DetailEcriture();
			
			detailEcriture.setDate(new Date());
			detailEcriture.setEcriture(en);
			detailEcriture.setMontantCredit(0);
			detailEcriture.setMontantDebit(reg.getMontantPayement());
			detailEcriture.setSens("D");
			
			//Requette pour renvoyer le compte Banque
			Compte cpt = compteRepository.getCompteBanque();
			detailEcriture.setCompte(cpt);
			detailEcriture.setSousCompte(sousCompteRepository.findOneSousCompteByCode(cpt.getId()));
			detailEcriture.setLibelle(reg.getCode()+"/ Votre règlement par banque[ "+reg.getBanque().getCode()+" ]");
			
			detailRepository.save(detailEcriture);
			
			//Compte CREDIT
			DetailEcriture detailEcriture2 = new DetailEcriture();
			
			detailEcriture2.setDate(new Date());
			detailEcriture2.setEcriture(en);
			detailEcriture2.setMontantCredit(reg.getMontantPayement());
			detailEcriture2.setMontantDebit(0);
			detailEcriture2.setSens("C");
			
			//Requette pour renvoyer le compte credit du client
			
			
			detailEcriture2.setCompte(sousCompteRepository.findOneByClient(en.getVente().getClient().getId()).getCompte());
			detailEcriture2.setSousCompte(sousCompteRepository.findOneSousCompteByCode(detailEcriture2.getCompte().getId()));
			detailEcriture2.setLibelle(reg.getCode()+"/ client: "+en.getVente().getClient().getRaisonSocial());
			
			detailRepository.save(detailEcriture2);		

			response = true;
		}
		
		return response;
	}

	@Override
	public boolean generateEcritureRegEspece(Long id) {
		
		boolean response = false;
		
		Reglement reg  = reglementRepository.findOne(id);
		
		List<Ecriture> Lecriture = ecritureRepository.findByReglement(reg);
		
		if (Lecriture.size() != 0) 
		{
			response = false;
			//Trouver Ecriture De la Vente En cours
			//List<DetailEcriture> Ldecriture = detailRepository.getDetailsByEcriture(ecritureRepository.getEcriture(reg.getVente()));
		}
		else 
		{
			Ecriture ecriture = new Ecriture();
			Parametre paecriture = parametreRepository.findByEcriture();
			ecriture.setCode("ECR-"+reg.getVente().getExercice().getLibelle()+"-"+paecriture.getValeur());
			ecriture.setIntituleEcriture(reg.getVente().getClient().getRaisonSocial()+",  REGLEMENT EN ESPECE");
			ecriture.setDateEcriture(new Date());
			ecriture.setExercice(reg.getVente().getExercice());
			
			ecriture.setVente(reg.getVente());
			ecriture.setReglement(reg);
			ecriture.setScrussale(reg.getVente().getScrussale());
			ecriture.setMois(moisRepository.getMoisTrue());
			ecriture.setTotalCredit( reg.getMontantPayement() );
			ecriture.setTotalDebit( reg.getMontantPayement()  );
			
			ecriture.setTypePiece(typeRepository.findOne(3L));
			ecriture.setJournalComptable(journalRepository.getJournalTresorerie());
			paecriture.setValeur(paecriture.getValeur() + 1 );
			parametreRepository.save(paecriture);
			Ecriture en = ecritureRepository.save(ecriture);
			System.out.println("djkgsdhkvgk"+en.getId());
			
			//Compte DEBIT
			DetailEcriture detailEcriture = new DetailEcriture();
			
			detailEcriture.setDate(new Date());
			detailEcriture.setEcriture(en);
			detailEcriture.setMontantCredit(0);
			detailEcriture.setMontantDebit(reg.getMontantPayement());
			detailEcriture.setSens("D");
			
			//Requette pour renvoyer le compte caisse
			Compte cpt = compteRepository.getCompteCaisse();
			detailEcriture.setCompte(cpt);
			detailEcriture.setSousCompte(sousCompteRepository.findOneSousCompteByCode(cpt.getId()));
			detailEcriture.setLibelle(reg.getCode()+"/ Caisse: règlement en espece[ "+reg.getBanque().getCode()+" ]");
			
			detailRepository.save(detailEcriture);
			
			//Compte CREDIT
			DetailEcriture detailEcriture2 = new DetailEcriture();
			
			detailEcriture2.setDate(new Date());
			detailEcriture2.setEcriture(en);
			detailEcriture2.setMontantCredit(reg.getMontantPayement());
			detailEcriture2.setMontantDebit(0);
			detailEcriture2.setSens("C");
			
			//Requette pour renvoyer le compte credit du client
			
			//detailEcriture2.setSousCompte(sousCompteRepository.findOneByClient(en.getVente().getClient().getId()) );
			detailEcriture2.setCompte(sousCompteRepository.findOneByClient(en.getVente().getClient().getId()).getCompte());
			detailEcriture2.setSousCompte(sousCompteRepository.findOneSousCompteByCode(detailEcriture2.getCompte().getId()));
			detailEcriture2.setLibelle(reg.getCode()+"/client: "+en.getVente().getClient().getRaisonSocial());
			
			detailRepository.save(detailEcriture2);		

			response = true;
		}
		
		return response;
	}

	@Override
	public boolean generateEcritureRegCheque(Long id) {
		
		
		boolean response = false;
		
		Reglement reg  = reglementRepository.findOne(id);
		
		List<Ecriture> Lecriture = ecritureRepository.findByReglement(reg);
		
		if (Lecriture.size() != 0) 
		{
			response = false;
			//Trouver Ecriture De la Vente En cours
			//List<DetailEcriture> Ldecriture = detailRepository.getDetailsByEcriture(ecritureRepository.getEcriture(reg.getVente()));
		}
		else 
		{
			//1ere étape (RECEPTION DU CHEQUE)
			
			Ecriture ecriture = new Ecriture();
			Parametre paecriture = parametreRepository.findByEcriture();
			ecriture.setCode("ECR-"+reg.getVente().getExercice().getLibelle()+"-"+paecriture.getValeur());
			ecriture.setIntituleEcriture(reg.getVente().getClient().getRaisonSocial()+",  VOTRE CHEQUE A ENCAISSER");
			ecriture.setDateEcriture(new Date());
			ecriture.setExercice(reg.getVente().getExercice());
			
			ecriture.setVente(reg.getVente());
			ecriture.setReglement(reg);
			ecriture.setScrussale(reg.getVente().getScrussale());
			ecriture.setMois(moisRepository.getMoisTrue());
			ecriture.setTotalCredit( reg.getMontantPayement() );
			ecriture.setTotalDebit( reg.getMontantPayement()  );
			
			ecriture.setTypePiece(typeRepository.findOne(3L));
			ecriture.setJournalComptable(journalRepository.getJournalTresorerie());
			paecriture.setValeur(paecriture.getValeur() + 1 );
			parametreRepository.save(paecriture);
			Ecriture en = ecritureRepository.save(ecriture);
			
			//2 étape (REMISE DE CHEQUE)
			
			Ecriture ecriture2 = new Ecriture();
			Parametre paecriture2 = parametreRepository.findByEcriture();
			ecriture2.setCode("ECR-"+reg.getVente().getExercice().getLibelle()+"-"+paecriture.getValeur());
			ecriture2.setIntituleEcriture(reg.getVente().getClient().getRaisonSocial()+",  VOTRE CHEQUE A L’ENCAISSEMENT\r\n" + 
					"");
			ecriture2.setDateEcriture(new Date());
			ecriture2.setExercice(reg.getVente().getExercice());
			
			ecriture2.setVente(reg.getVente());
			ecriture2.setReglement(reg);
			ecriture2.setScrussale(reg.getVente().getScrussale());
			ecriture2.setMois(moisRepository.getMoisTrue());
			ecriture2.setTotalCredit( reg.getMontantPayement() );
			ecriture2.setTotalDebit( reg.getMontantPayement()  );
			
			ecriture2.setTypePiece(typeRepository.findOne(3L));
			ecriture2.setJournalComptable(journalRepository.getJournalTresorerie());
			paecriture2.setValeur(paecriture.getValeur() + 1 );
			parametreRepository.save(paecriture);
			Ecriture en2 = ecritureRepository.save(ecriture2);
	
			//****************************************************************************************//
			    //***************** DETAIL DES DEUX ETAPE DE REGLEMENT CHEQUE***************** //
			//***************************************************************************************//
			
			//Compte DEBIT
			DetailEcriture detailEcriture = new DetailEcriture();
			
			detailEcriture.setDate(new Date());
			detailEcriture.setEcriture(en);
			detailEcriture.setMontantCredit(reg.getMontantPayement());
			detailEcriture.setMontantDebit(0);
			detailEcriture.setSens("C");
			
			//Requette pour renvoyer le compte Cheque à encaisser
			Compte cpt = compteRepository.getCompteEncaissement();
			detailEcriture.setCompte(cpt);
			detailEcriture.setSousCompte(sousCompteRepository.findOneSousCompteByCode(cpt.getId()));
			detailEcriture.setLibelle(reg.getCode()+"/  Cheque à encaisser à la[ "+reg.getBanque().getCode()+" ]");
			
			detailRepository.save(detailEcriture);
			
			//Compte CREDIT
			DetailEcriture detailEcriture2 = new DetailEcriture();
			
			detailEcriture2.setDate(new Date());
			detailEcriture2.setEcriture(en);
			detailEcriture2.setMontantCredit(0);
			detailEcriture2.setMontantDebit(reg.getMontantPayement());
			detailEcriture2.setSens("D");
			
			//Requette pour renvoyer le compte credit du client
			detailEcriture2.setCompte(sousCompteRepository.findOneByClient(en.getVente().getClient().getId()).getCompte());
			detailEcriture2.setSousCompte(sousCompteRepository.findOneSousCompteByCode(detailEcriture2.getCompte().getId()));
			
			detailEcriture2.setLibelle(reg.getCode()+"/client: "+en.getVente().getClient().getRaisonSocial());
			
			detailRepository.save(detailEcriture2);		
			
			//****POUR LE DEXIEME
			
			//Compte DEBIT
			DetailEcriture detailEcriture3 = new DetailEcriture();
			
			detailEcriture3.setDate(new Date());
			detailEcriture3.setEcriture(en2);
			detailEcriture3.setMontantCredit(0);
			detailEcriture3.setMontantDebit(reg.getMontantPayement());
			detailEcriture3.setSens("D");
			
			//Requette pour renvoyer le compte Cheque à encaisser
			Compte cpt3 = compteRepository.getCompteEncaissement();
			detailEcriture3.setCompte(cpt3);
			detailEcriture3.setSousCompte(sousCompteRepository.findOneSousCompteByCode(cpt3.getId()));
			detailEcriture3.setLibelle(reg.getCode()+"/  Cheque à encaisser à la[ "+reg.getBanque().getCode()+" ]");
			
			detailRepository.save(detailEcriture3);
			
			//Compte CREDIT
			DetailEcriture detailEcriture4 = new DetailEcriture();
			
			detailEcriture4.setDate(new Date());
			detailEcriture4.setEcriture(en2);
			detailEcriture4.setMontantCredit(reg.getMontantPayement());
			detailEcriture4.setMontantDebit(0);
			detailEcriture4.setSens("C");
			
			//Requette pour renvoyer le compte credit du client
			Compte cpt4 = compteRepository.getCompteBanque();
			detailEcriture4.setCompte(cpt4);
			detailEcriture4.setSousCompte(sousCompteRepository.findOneSousCompteByCode(cpt4.getId()));
			detailEcriture4.setLibelle(reg.getCode()+"/ "+reg.getBanque().getLibelle());
			
			detailRepository.save(detailEcriture4);		

			response = true;
		}
		
		return response;
	}

	@Override
	public void etatFacturation(Long idreglement)
	{
		Reglement r  = reglementRepository.findOne(idreglement);
	    double total = reglementRepository.sommeTotaleReglement(r.getVente());	
	    
	    if (r.getVente().getMontantTTC() == total) 
	    {
			Vente vente = venteRepositry.findOne(r.getVente().getId());
			vente.setEtatFacture(true);
		}else {
			System.out.println("============= > Rien a faire comparaison restart" );
		}
	}

	
}
