package ibssolutions.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ibssolutions.entity.clientelle.Client;


public interface ClientRepository extends JpaRepository<Client, Long>{

	@Query("select c from Client c order by c.raisonSocial")
	List<Client> listeOrdonee();

	@Query("select c from Client c  where c.scrussale.id=:x order by c.raisonSocial")
	List<Client> listeOrdoneeByScrussale(@Param("x") Long idScrussale);

	
}
