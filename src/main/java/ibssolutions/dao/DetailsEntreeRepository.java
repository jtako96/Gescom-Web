package ibssolutions.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ibssolutions.commande.DetailsEntree;


public interface DetailsEntreeRepository extends JpaRepository<DetailsEntree,Long> {

	//Liste des detailEntres ordonnee
	@Query(" select d from DetailsEntree d where d.entreeStock.id=:x")
	List<DetailsEntree> listByEntree(@Param("x") Long id);


}
