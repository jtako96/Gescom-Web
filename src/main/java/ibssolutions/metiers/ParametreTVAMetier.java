package ibssolutions.metiers;

import java.util.List;

import javax.servlet.http.HttpSession;

import ibssolutions.entity.parametre.ParametreTVA;


public interface ParametreTVAMetier {

	public ParametreTVA addParametreTVA( ParametreTVA p );
	public ParametreTVA editeParametreTVA( Long id );
	public void deleteParametreTVA ( Long id );
	
	public List<ParametreTVA> findAllOrdonly ();
	
	public double getTVAScrussale(HttpSession httpSession);
	
}
