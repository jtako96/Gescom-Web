package ibssolutions.metiersI.comptabilite;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ibssolutions.dao.TypePieceRepository;
import ibssolutions.entity.comptabilite.TypePiece;
import ibssolutions.metiers.comptabilite.TypePieceMetier;

@Service @Transactional
public class ITypePieceMetier implements TypePieceMetier{

	@Autowired
	TypePieceRepository journalRepository;

	@Override
	public TypePiece addTypePiece(TypePiece tp) {
		
		return journalRepository.save(tp);
	}

	@Override
	public TypePiece editeTypePiece(Long id) {
		
		return journalRepository.findOne(id);
	}

	@Override
	public void deleteTypePiece(Long id) {
		journalRepository.delete(id);
	}

	@Override
	public List<TypePiece> findAllOrdonly() {
		
		return journalRepository.findAll();
	}

	
	
}
