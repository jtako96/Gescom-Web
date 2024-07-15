package ibssolutions.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ibssolutions.entity.parametre.Scrussale;
import ibssolutions.entity.vente.Proforma;

public interface ProformaRepository extends JpaRepository<Proforma, Long>{

	@Query("select p from Proforma p where p.scrussale=:x and p.exercice.etat=true order by p.id desc")
	List<Proforma> listeProformaScrussal(@Param("x")  Scrussale findOne);

}
