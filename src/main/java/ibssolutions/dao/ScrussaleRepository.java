package ibssolutions.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import ibssolutions.entity.parametre.Scrussale;

public interface ScrussaleRepository extends JpaRepository<Scrussale, Long> {

	@Query("select s from Scrussale s order by s.pays ")
	public List<Scrussale> findAllScrussale();
}
