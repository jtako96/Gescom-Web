package ibssolutions.metiers.vente;

import java.util.List;

import javax.servlet.http.HttpSession;

import ibssolutions.entity.vente.Vente;

public interface VenteMetier {

	public Vente addVente(Vente v,HttpSession httpsession);
	public Vente editeVente(Long id);
	public void deleteVente(Long id);
	//Sauegarder une vente apres l'ajout des details
	public Vente updateVente(Vente v);
	
	public boolean genererVente(Long idproforma);
	List<Vente> ventetByScrussale(HttpSession httpSession);
	
	public boolean genererEcriture(Long idvente, HttpSession httpsession);
	public List<Vente> venteNonSolde(Long id);
	
}
