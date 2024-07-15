package ibssolutions.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import ibssolutions.entity.parametre.Mois;

public interface MoisRepository extends JpaRepository<Mois, Long> {

	//Recuperer le mois actif pour l'utilisation automatique sans choix
	@Query("select m from Mois m where m.etat=true")
	public Mois getMoisTrue();

}
