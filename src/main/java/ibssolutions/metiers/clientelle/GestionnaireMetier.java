package ibssolutions.metiers.clientelle;

import java.util.List;

import ibssolutions.entity.clientelle.Gestionnaire;

public interface GestionnaireMetier {

	public Gestionnaire  addGestionnaire(Gestionnaire g);
	public Gestionnaire editeGestionnaire(Long id);
	public void deleteGestionnaire(Long id);
	
	public List<Gestionnaire> findAllGestionnaire();
}
