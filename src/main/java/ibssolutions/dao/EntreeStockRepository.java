package ibssolutions.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import ibssolutions.commande.EntreeStock;


public interface EntreeStockRepository extends JpaRepository<EntreeStock,Long> {

	@Query("select e from EntreeStock e where e.exercice.etat=true order by e.id desc")
	List<EntreeStock> listOrdonly();


}
