package ibssolutions.metiers.vente;

import java.util.List;

import javax.servlet.http.HttpSession;

import ibssolutions.entity.vente.Panier;

public interface PanierMetier {

	public Panier addPanier(boolean actionTVA, Long idvente, Long idstock,Panier p);
	public Panier editePanier(Long id);
	public void deletePanier(Long id);
	
	public double calculHT(Long idvente);
	public double calculTOTALREMISE(Long idvente);
	public double calculTVA(Long idvente);
	public double calculTTC(Long idvente);
	
	List<Panier> detailventeByScrussale(HttpSession httpSession, Long vente);
	double calculRemise(Long idvente);
	
}
