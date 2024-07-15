package ibssolutions.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import ibssolutions.entity.parametre.TypeMagasin;

public interface TypeMagasinRepository extends JpaRepository<TypeMagasin, Long>{

	@Query("select t from TypeMagasin t order by t.libelle")
	List<TypeMagasin> findAllOrder();


}
