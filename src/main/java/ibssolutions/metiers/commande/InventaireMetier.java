package ibssolutions.metiers.commande;

import java.util.List;

import javax.servlet.http.HttpSession;

import ibssolutions.commande.DetailsInventaire;
import ibssolutions.commande.Inventaire;

public interface InventaireMetier {

	public Inventaire addInventaire(Inventaire i,HttpSession httpSession);
	public Inventaire editeInventaire(Long iod);
	public void deleteInventaire(Long id);
	
	public List<Inventaire>ListeInventaire(HttpSession httpSession);
	public boolean generateDetails(HttpSession httpSession,Long idmagasin,Long idinv);
	public List<DetailsInventaire>listedetails(Long idinventaire,Long idmagasin,HttpSession httpSession);
	void saveDetails(DetailsInventaire d);
	List<Inventaire> ListeInventaire(Long idscrussale, Long idmois);
	public List<DetailsInventaire> listeDetailsbyIDinve(Long id);
	void validerInventaire(Long idDetails);
}
