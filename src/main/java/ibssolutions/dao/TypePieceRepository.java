package ibssolutions.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import ibssolutions.entity.comptabilite.TypePiece;

public interface TypePieceRepository extends JpaRepository<TypePiece, Long> {

}
