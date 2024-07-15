package ibssolutions.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ibssolutions.entity.comptabilite.SousClasse;

public interface SousClasseRepository extends JpaRepository<SousClasse, Long>{

	@Query("select s from SousClasse s where s.classe.id=:x")
	List<SousClasse> listeSousClasseByIdClasse(@Param("x") Long id);

}
