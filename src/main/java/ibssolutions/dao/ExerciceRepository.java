package ibssolutions.dao;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import ibssolutions.entity.parametre.Exercice;

public interface ExerciceRepository extends JpaRepository<Exercice, Long> {

	//Recuperer l'exercice actif pour l'utilisation automatique sans choix
	@Query("select e from Exercice e where e.etat=true")
	public Exercice getExerciceTrue();

	@Query("select e from Exercice e order by e.id desc")
	public List<Exercice> findAllExercice();





}
