package ibssolutions.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import ibssolutions.entity.comptabilite.Compte;
import ibssolutions.entity.comptabilite.SousCompte;

public interface SousCompteRepository extends JpaRepository<SousCompte, Long>{

	@Query("select c from SousCompte c where c.compte.id=:x")
	List<SousCompte> listBySubdivision(@Param("x") Long id);

	@Transactional
	@Query("delete from SousCompte c where c.index=:x")
	void deleteByIndex(@Param("x") int valeur);

	@Query("select c from SousCompte c where c.idStatut=:x and c.statut='C'")
	SousCompte findOneByClient(@Param("x") Long id);

	@Query("select c from SousCompte c where c.compte.id=:x")
	Compte findOneByCompteClient(@Param("x") Long id);

	@Query("select c from SousCompte c where c.compte.id=:x")
	SousCompte findOneSousCompteByCode(@Param("x")   Long id);

	@Query("select c from SousCompte c where c.compte.id=:x")
	List<SousCompte> findAllByCompte(@Param("x")  Long id);

}
