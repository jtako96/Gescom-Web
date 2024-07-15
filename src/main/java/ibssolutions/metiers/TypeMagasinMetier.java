package ibssolutions.metiers;

import java.util.List;

import ibssolutions.entity.parametre.TypeMagasin;


public interface TypeMagasinMetier {

	public TypeMagasin addTypeMagasin( TypeMagasin m );
	public TypeMagasin editeTypeMagasin( Long id );
	public void deleteTypeMagasin ( Long id );
	
	public List<TypeMagasin> findAllOrdonly ();
	
}
