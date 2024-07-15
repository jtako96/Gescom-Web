package ibssolutions.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ibssolutions.entity.comptabilite.Compte;

public interface CompteRepository extends JpaRepository<Compte, Long>{

	@Query("select c from Compte c where c.subdivision.id=:x")
	List<Compte> listBySubdivision(@Param("x") Long id);

	
	//Retourné le compte de gestion TVA du plan comptable
	@Query("select c from Compte c where c.numero=4431")
	Compte getCompteTVA();
	
	//Retourné le compte de gestion TVA du plan comptable sur Prestation
		@Query("select c from Compte c where c.numero=4432")
		Compte getCompteTVAPrestation();
	
	//Retourné le compte de gestion des VENTE du plan comptable
	@Query("select c from Compte c where c.numero=7011")
	Compte getCompteVENTE();
	
	//Retourné le compte de gestion des PRESTATIONS du plan comptable
	@Query("select c from Compte c where c.numero=7061")
	Compte getCompteServicevendu();


	//Retourné le compte de gestion de Stock du plan comptable 3111
	@Query("select c from Compte c where c.numero=3111")
	Compte getCompteStock();

	@Query("select c from Compte c where c.numero=6031")
	Compte getCompteStockVariation();

	@Query("select c from Compte c where c.numero=5211")
	Compte getCompteBanque();

	@Query("select c from Compte c where c.numero=5711")
	Compte getCompteCaisse();

	@Query("select c from Compte c where c.numero=5130")
	Compte getCompteEncaissement();
	

}
