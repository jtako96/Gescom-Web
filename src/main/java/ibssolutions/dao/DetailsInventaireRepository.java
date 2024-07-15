package ibssolutions.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import ibssolutions.commande.DetailsInventaire;

public interface DetailsInventaireRepository extends JpaRepository<DetailsInventaire, Long>{

	
}
