package ibssolutions.metiers.comptabilite;

import java.util.List;
import java.util.Map;
import java.util.Vector;

import ibssolutions.entity.comptabilite.Reglement;


public interface ReglementMetier {

	public Reglement addReglement(Reglement r);
	public Reglement editeReglement(Long id);
	
	public void deleteReglement(Long id);
	
	public List<Reglement> findAllOrdorlyByName();
	public List<Reglement> findAllOrdorlyByDette(Long id);
	
	public Map<String,Object> apayer_payer_rapayer(Long id1) ;
	
	
	public Double renvoieMontantApayer(Long iddette) ;
	public Double renvoieMontantPayer(Long iddette) ;
	public int testervalidation(Long id,Double montant);

	@SuppressWarnings("rawtypes")
	public  Vector situationReglement(Long id);
	
	public boolean generateEcritureRegBancaire(Long id);
	public boolean generateEcritureRegEspece(Long id);
	boolean generateEcritureRegCheque(Long id);
	void etatFacturation(Long idreglement);
	
	
	
}
