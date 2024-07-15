package ibssolutions.metiers.vente;

import java.util.List;

import javax.servlet.http.HttpSession;

import ibssolutions.entity.vente.DetailProforma;

public interface DetailProformaMetier {

	public DetailProforma addDetailProforma(boolean actionTVA, Long idproforma, Long idstock,DetailProforma p);
	public DetailProforma editeDetailProforma(Long id);
	public void deleteDetailProforma(Long id);
	
	public double calculHT(Long idproforma);
	public double calculTOTALREMISE(Long idproforma);
	public double calculTVA(Long idproforma);
	public double calculTTC(Long idproforma);
	
	List<DetailProforma> detailproformatByScrussale(HttpSession httpSession, Long proforma);
	double calculRemise(Long idproforma);
	
}
