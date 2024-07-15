package ibssolutions.metiers.comptabilite;

import java.util.List;

import ibssolutions.entity.comptabilite.TypePiece;

public interface TypePieceMetier {

	public TypePiece addTypePiece( TypePiece tp );
	public TypePiece editeTypePiece( Long id );
	public void deleteTypePiece ( Long id );
	
	public List<TypePiece> findAllOrdonly ();
	
}
