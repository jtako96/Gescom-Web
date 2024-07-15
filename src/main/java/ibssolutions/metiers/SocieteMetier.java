package ibssolutions.metiers;

import java.util.List;

import ibssolutions.entity.parametre.Societe;

public interface SocieteMetier {

	public Societe addSociete( Societe s );
	public Societe editeSociete( Long id );
	public void  deleteSociete ( Long id );
	
	public List<Societe> findAllOrdonly ();
	
}
