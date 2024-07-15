package ibssolutions.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import ibssolutions.entity.vente.TypePrestation;

public interface TypePrestationRepository extends JpaRepository<TypePrestation, Long> {

	
}
