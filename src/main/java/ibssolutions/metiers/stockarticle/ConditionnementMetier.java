package ibssolutions.metiers.stockarticle;

import java.util.List;

import ibssolutions.entity.stockarticle.Conditionnement;


public interface ConditionnementMetier {

	public Conditionnement addConditionnement( Conditionnement c );
	public Conditionnement editeConditionnement( Long id );
	public void deleteConditionnement ( Long id );
	
	public List<Conditionnement> findAllOrdonly ();
	
}
