package ibssolutions.metiers;

import java.util.List;

import ibssolutions.entity.parametre.Magasin;


public interface MagasinMetier {

	public Magasin addMagasin( Magasin m );
	public Magasin editeMagasin( Long id );
	public void deleteMagasin ( Long id );
	
	public List<Magasin> findAllByTypeMagasin (Long id);
	public List<Magasin> findAllOrdreBy ();
	
}
