package ibssolutions.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import ibssolutions.entity.parametre.Parametre;


public interface ParametreRepository extends JpaRepository<Parametre,Long> {

	@Query(" select p from Parametre p where p.libelle = 'Article'")
	Parametre findByArticle();

	@Query(" select p from Parametre p where p.libelle = 'Vente'")
	Parametre findByVente();
	
	@Query(" select p from Parametre p where p.libelle = 'Client'")
	Parametre findByClient();

	@Query(" select p from Parametre p where p.libelle = 'Reglement'")
	Parametre findByReglement();

	@Query(" select p from Parametre p where p.libelle = 'Proforma'")
	Parametre findByProforma();

	@Query(" select p from Parametre p where p.libelle = 'Ecriture'")
	Parametre findByEcriture();

	@Query(" select p from Parametre p where p.libelle = 'BonLivraison'")
	Parametre findByBonLivraison();

	@Query(" select p from Parametre p where p.libelle = 'Inventaire'")
	Parametre findByInventaire();

	@Query(" select p from Parametre p where p.libelle = 'Prestation'")
	Parametre findByPrestation();

	@Query(" select p from Parametre p where p.libelle = 'Entree'")
	Parametre findByEntrer();

}
