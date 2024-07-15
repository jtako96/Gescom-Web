package ibssolutions.metiers.vente;

import java.util.List;

import javax.servlet.http.HttpSession;

import ibssolutions.entity.vente.DetailPrestation;

public interface DetailPrestationMetier {

	public DetailPrestation addDetailPrestation(boolean actionTVA, Long idprestation,DetailPrestation p);
	public DetailPrestation editeDetailPrestation(Long id);
	public void deleteDetailPrestation(Long id);
	
	public double calculHT(Long idprestation);
	public double calculTOTALREMISE(Long idprestation);
	public double calculTVA(Long idprestation);
	public double calculTTC(Long idprestation);
	
	List<DetailPrestation> detailproformatByScrussale(HttpSession httpSession, Long prestation);
	double calculRemise(Long idproforma);
	
}
