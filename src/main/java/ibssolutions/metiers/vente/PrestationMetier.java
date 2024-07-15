package ibssolutions.metiers.vente;

import java.util.List;

import javax.servlet.http.HttpSession;

import ibssolutions.entity.vente.Prestation;

public interface PrestationMetier {

	public Prestation addPrestation(Prestation p,HttpSession httpsession);
	public Prestation editePrestation(Long id);
	public void deletePrestation(Long id);
	public List<Prestation> prestationByScrussale(HttpSession httpSession);
	//Sauvegarder une prestation apres l'ajout des details
	public Prestation updatePrestation(Prestation p);
	boolean genererEcriture(Long idpres);
	
}
