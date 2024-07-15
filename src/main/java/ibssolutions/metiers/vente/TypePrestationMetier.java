package ibssolutions.metiers.vente;

import java.util.List;

import ibssolutions.entity.vente.TypePrestation;


public interface TypePrestationMetier {

	public TypePrestation addTypePrestation( TypePrestation tp );
	public TypePrestation editeTypePrestation( Long id );
	public void deleteTypePrestation ( Long id );
	
	public List<TypePrestation> findAllOrdonly ();
	
}
