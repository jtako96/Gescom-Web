package ibssolutions.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import ibssolutions.entity.stockarticle.GroupProduit;

public interface GroupProduitRepository extends JpaRepository<GroupProduit, Long>{

	@Query("select g from GroupProduit g order by g.libelle")
	List<GroupProduit> listeOrdonee();

	
}
