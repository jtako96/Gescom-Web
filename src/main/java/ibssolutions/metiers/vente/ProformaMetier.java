package ibssolutions.metiers.vente;

import java.util.List;

import javax.servlet.http.HttpSession;

import ibssolutions.entity.vente.Proforma;

public interface ProformaMetier {

	public Proforma addProforma(Proforma p,HttpSession httpsession);
	public Proforma editeProforma(Long id);
	public void deleteProforma(Long id);
	public List<Proforma> proformatByScrussale(HttpSession httpSession);
	//Sauegarder un proforma apres l'ajout des details
	public Proforma updateProforma(Proforma p);
	
}
