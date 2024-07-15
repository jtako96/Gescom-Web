package ibssolutions.metiers.stockarticle;

import java.util.List;

import ibssolutions.entity.stockarticle.GroupProduit;


public interface GroupProduitMetier {

	public GroupProduit addGroupProduit( GroupProduit g );
	public GroupProduit editeGroupProduit( Long id );
	public void deleteGroupProduit ( Long id );
	
	public List<GroupProduit> findAllOrdonly ();
	
}
