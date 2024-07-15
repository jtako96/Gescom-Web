package ibssolutions.metiers;

import java.util.List;

import ibssolutions.entity.parametre.ModeReglement;


public interface ModeReglementMetier {

	public ModeReglement addModeReglement( ModeReglement m );
	public ModeReglement editeModeReglement( Long id );
	public void deleteModeReglement ( Long id );
	
	public List<ModeReglement> findAllOrdonly ();
	
}
