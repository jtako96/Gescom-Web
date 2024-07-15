package ibssolutions.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import ibssolutions.commande.Fournisseur;


public interface FournisseurRepository extends JpaRepository<Fournisseur,Long> {

	//Liste des Fournisseurs ordonnee par nom
	@Query(" select f from Fournisseur f order by f.nom")
	List<Fournisseur> listOrdorly();

}
