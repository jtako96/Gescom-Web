package ibssolutions.metiersI.commande;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ibssolutions.commande.BonLivraison;
import ibssolutions.commande.DetailsLivraison;
import ibssolutions.dao.BonLivraisonRepository;
import ibssolutions.dao.CompteRepository;
import ibssolutions.dao.DetailEcritureRepository;
import ibssolutions.dao.DetailLivraisonRepository;
import ibssolutions.dao.EcritureRepository;
import ibssolutions.dao.ExerciceRepository;
import ibssolutions.dao.JournalComptableRepository;
import ibssolutions.dao.MoisRepository;
import ibssolutions.dao.PanierRepository;
import ibssolutions.dao.ParametreRepository;
import ibssolutions.dao.ScrussaleRepository;
import ibssolutions.dao.StatutLivraisonRepository;
import ibssolutions.dao.StockRepository;
import ibssolutions.dao.TypePieceRepository;
import ibssolutions.dao.UserRepository;
import ibssolutions.dao.VenteRepository;
import ibssolutions.entity.comptabilite.Compte;
import ibssolutions.entity.comptabilite.DetailEcriture;
import ibssolutions.entity.comptabilite.Ecriture;
import ibssolutions.entity.parametre.Parametre;
import ibssolutions.entity.parametre.User;
import ibssolutions.entity.stockarticle.Stock;
import ibssolutions.entity.vente.Panier;
import ibssolutions.entity.vente.Vente;
import ibssolutions.metiers.commande.BonLivraisonMetier;
import ibssolutions.utils.GetLoggers;

@Service @Transactional
public class IBonLivraisonMetier implements BonLivraisonMetier{

	@Autowired
	JournalComptableRepository journalRepository;
	
	@Autowired 
	TypePieceRepository typeRepository;
	
	@Autowired
	BonLivraisonRepository livraisonRepository;
	
	@Autowired
	ExerciceRepository exerciceRepository;
	
	@Autowired
	ParametreRepository parametreRepository;
	
	@Autowired
	UserRepository userrep;
	
	@Autowired
	ScrussaleRepository scrussaleRepository;
	
	@Autowired
	VenteRepository venteRepository;
	
	@Autowired
	PanierRepository panierRepository;
	
	@Autowired
	DetailLivraisonRepository detailLivRepository;
	
	@Autowired
	EcritureRepository ecritureRepository;
	
	@Autowired
	MoisRepository moisRepository;
	
	@Autowired
	StatutLivraisonRepository statutLivraisonRepository;
	
	@Autowired
	CompteRepository compteRepository;
	
	@Autowired
	DetailEcritureRepository detailRepository;
	
	@Autowired
	StockRepository  stockRepository;
	
	@Override
	public BonLivraison addBonLivraison(BonLivraison b,HttpSession httpsession) {

		Map<String, Object> recuperer =  GetLoggers.getUserLogger(httpsession);
		User users = userrep.findOne(recuperer.get("username").toString());
	
		Parametre p = parametreRepository.findByBonLivraison();
		b.setNumero("BL"+exerciceRepository.getExerciceTrue().getLibelle()+"-"+p.getValeur());
		p.setValeur(p.getValeur()+1);
		parametreRepository.save(p);
		b.setExercice(exerciceRepository.getExerciceTrue());
		b.setScrussale(scrussaleRepository.findOne(users.getIdScrussale()));
		return livraisonRepository.save(b);
	}

	@Override
	public BonLivraison editeBonLivraison(Long id) {
		
		return livraisonRepository.findOne(id);
	}

	@Override
	public void deleteBonLivraison(Long id) {
		
		livraisonRepository.delete(id);
	}

	@Override
	public List<BonLivraison> findAllOrdonly(HttpSession httpsession) {
		
		Map<String, Object> recuperer =  GetLoggers.getUserLogger(httpsession);
		User users = userrep.findOne(recuperer.get("username").toString());
		
		return livraisonRepository.listeAllLivraison(scrussaleRepository.findOne(users.getIdScrussale()).getId());
	}

	@Override
	public boolean generateEcritureSortieStock(Long id) {
		
		boolean response = false;
				
		BonLivraison b = livraisonRepository.findOne(id);
		
		List<Ecriture> Lecriture = ecritureRepository.findByBonLivraison(b);
		
		if (Lecriture.size() != 0) 
		{
			response = false;
		}
		else 
		{
			Ecriture ecriture = new Ecriture();
			Parametre paecriture = parametreRepository.findByEcriture();
			ecriture.setCode("ECR-"+b.getVente().getExercice().getLibelle()+"-"+paecriture.getValeur());
			ecriture.setIntituleEcriture(b.getVente().getClient().getRaisonSocial()+", SORTIE EN STOCK");
			ecriture.setDateEcriture(new Date());
			ecriture.setExercice(b.getExercice());
			ecriture.setBonLivraison(b);
			ecriture.setVente(b.getVente());
			ecriture.setScrussale(b.getScrussale());
			ecriture.setMois(moisRepository.getMoisTrue());
			ecriture.setTotalCredit( b.getVente().getMontantTTC() );
			ecriture.setTotalDebit( b.getVente().getMontantTTC() );
			
			ecriture.setTypePiece(typeRepository.findOne(2L));
			ecriture.setJournalComptable(journalRepository.getJournalOperationDivers());
			paecriture.setValeur(paecriture.getValeur() + 1 );
			parametreRepository.save(paecriture);
			Ecriture en = ecritureRepository.save(ecriture);
			System.out.println("djkgsdhkvgk"+en.getId());
			
			//Compte DEBIT
			DetailEcriture detailEcriture = new DetailEcriture();
			
			detailEcriture.setDate(new Date());
			detailEcriture.setEcriture(en);
			detailEcriture.setMontantCredit(0);
			detailEcriture.setMontantDebit(b.getVente().getMontantTTC());
			detailEcriture.setSens("D");
			
			//Requette pour renvoyer le compte Stock variations
			Compte cpt = compteRepository.getCompteStockVariation();
			detailEcriture.setCompte(cpt);
			detailEcriture.setLibelle(b.getNumero()+"/  Variation de stock de marchandises");
			
			detailRepository.save(detailEcriture);
			
			//Compte CREDIT
			DetailEcriture detailEcriture2 = new DetailEcriture();
			
			detailEcriture2.setDate(new Date());
			detailEcriture2.setEcriture(en);
			detailEcriture2.setMontantCredit(b.getVente().getMontantTTC());
			detailEcriture2.setMontantDebit(0);
			detailEcriture2.setSens("C");
			
			//Requette pour renvoyer le compte Stock
			Compte cpt1 = compteRepository.getCompteStock();
			detailEcriture2.setCompte(cpt1);
			detailEcriture2.setLibelle(b.getNumero()+"/ Stock de marchandises");
			
			detailRepository.save(detailEcriture2);		

			response = true;
		}
		
		return response;
	}
	
   @Override
   public boolean generateDetailsBon(Long id,Long idbon,HttpSession httpsession) {
	   
	    boolean res = false;
	   
	    Map<String, Object> recuperer =  GetLoggers.getUserLogger(httpsession);
		User users = userrep.findOne(recuperer.get("username").toString());
		
		Vente v = venteRepository.findOne(id);
		List<Panier> Lpanier = panierRepository.listePanierScrussal(scrussaleRepository.findOne(users.getIdScrussale()), v);
		
		if (Lpanier.size()!=0)
		{
			for (Panier panier : Lpanier) 
			{
				
				DetailsLivraison d = new DetailsLivraison();
				d.setPanier(panier);
				d.setBonLivraison(livraisonRepository.findOne(idbon));
				d.setQteALivrer(0);
				d.setQteCommande(panier.getQuantite());
				
				d.setResteALivrer(d.getQteCommande() - d.getQteALivrer());
				detailLivRepository.save(d);
				
			}
			res = true;	
			v.setStatutLivraison(statutLivraisonRepository.findOne(2L));
			BonLivraison b = livraisonRepository.findOne(idbon);
			b.setVente(v);
			venteRepository.save(v);
			livraisonRepository.save(b);
		}
		else
		{
			res = false;
		}
		
		return res;
	}

	@Override
	public List<Vente> findAllVenteScrussale(HttpSession httpsession) 
	{
		Map<String, Object> recuperer =  GetLoggers.getUserLogger(httpsession);
		User users = userrep.findOne(recuperer.get("username").toString());
		
		return livraisonRepository.listeAllVenteScrussale(scrussaleRepository.findOne(users.getIdScrussale()).getId());
	}
	
	@Override
	public List<DetailsLivraison> findDetailsBonScrussale(Long idbon,HttpSession httpsession) 
	{
		Map<String, Object> recuperer =  GetLoggers.getUserLogger(httpsession);
		User users = userrep.findOne(recuperer.get("username").toString());
		
		return detailLivRepository.getAllDetails(idbon,scrussaleRepository.findOne(users.getIdScrussale()).getId());
	}

	@Override
	public void validerDetails(Long id,int quantiteAlivrer) {
		
		DetailsLivraison dl = detailLivRepository.findOne(id);
		
		dl.setQteALivrer(dl.getQteALivrer() + quantiteAlivrer);
		
		dl.setReste(quantiteAlivrer);
		
		dl.setResteALivrer(dl.getQteCommande() - dl.getQteALivrer());
		
		if (dl.getQteCommande() == 0) {
			dl.setEtat(true);
		}
		
		detailLivRepository.save(dl);
		
	}
	
	@Override
	public boolean calculeQte(Long id ) {
		boolean resultat = false;
		//PROCEDURE POUR LA REDUCTION DE LA QUANTITE
		BonLivraison b = livraisonRepository.findOne(id);
		List<Panier> Lpanier = stockRepository.findArticleByVente(b.getVente().getId());
		for (Panier panier : Lpanier) 
		{
			Stock stock = stockRepository.findOne(panier.getStock().getId());
			if (stock.getQuantiteReel() < panier.getQuantite()) 
			{
				resultat = false;
			}
			else 
			{
				stock.setQuantiteReel(stock.getQuantiteReel() - panier.getQuantite());
				stockRepository.save(stock);
				DetailsLivraison  dv =  detailLivRepository.getDetailsLivraison(b.getVente().getId(),panier);
				dv.setEtatImprimer(true);
				detailLivRepository.save(dv);
				resultat = true;
			}
			
		}
		
		return resultat;
	}


	@Override
	public BonLivraison updateBonLivraison(BonLivraison p) {

		return livraisonRepository.save(p);
	}

	
	@Override
	public boolean controle(Long id) {
		
		boolean resultat = false;
		
		BonLivraison b = livraisonRepository.findOne(id);
		List<Panier> Lpanier = stockRepository.findArticleByVente(b.getVente().getId());
		for (Panier panier : Lpanier) 
		{
			System.out.println("=========PANIER EN COURS============ "+panier.getId());
			
			Stock stock = stockRepository.findOne(panier.getStock().getId());
			if (stock.getQuantiteReel() < panier.getQuantite()) 
			{
				resultat = true;
				break;
			}
			else 
			{
				resultat = false;
				System.out.println("=====================RESULTAT ============ "+stock.getQuantiteReel()+"**** Etat *** " + resultat);
			}
		
		}
		
		return resultat;
	
	}
	
}
