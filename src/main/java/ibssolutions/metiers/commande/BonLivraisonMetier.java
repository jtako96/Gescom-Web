package ibssolutions.metiers.commande;

import java.util.List;

import javax.servlet.http.HttpSession;

import ibssolutions.commande.BonLivraison;
import ibssolutions.commande.DetailsLivraison;
import ibssolutions.entity.vente.Vente;

public interface BonLivraisonMetier {

	public BonLivraison addBonLivraison(BonLivraison b,HttpSession httpsession);
	public BonLivraison editeBonLivraison(Long id);
	
	public void deleteBonLivraison(Long id);
	public List<BonLivraison>findAllOrdonly(HttpSession httpsession);
	public boolean generateEcritureSortieStock(Long id);
	List<Vente> findAllVenteScrussale(HttpSession httpsession);
	boolean generateDetailsBon(Long id, Long idbon, HttpSession httpsession);
	List<DetailsLivraison> findDetailsBonScrussale(Long idvente, HttpSession httpsession);
	void validerDetails(Long id, int quantiteAlivrer);
	boolean calculeQte(Long id);
	BonLivraison updateBonLivraison(BonLivraison p);
	boolean controle(Long id);
}
