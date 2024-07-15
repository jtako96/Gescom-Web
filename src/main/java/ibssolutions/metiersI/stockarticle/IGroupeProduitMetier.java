package ibssolutions.metiersI.stockarticle;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ibssolutions.dao.GroupProduitRepository;
import ibssolutions.entity.stockarticle.GroupProduit;
import ibssolutions.metiers.stockarticle.GroupProduitMetier;

@Service @Transactional
public class IGroupeProduitMetier implements GroupProduitMetier{

	
	@Autowired
	private GroupProduitRepository groupProduitRepository;
	
	
	@Override
	public GroupProduit addGroupProduit(GroupProduit g) {
		
		return groupProduitRepository.save(g);
	}

	@Override
	public GroupProduit editeGroupProduit(Long id) {
		
		return groupProduitRepository.findOne(id);
	}

	@Override
	public void deleteGroupProduit(Long id) {
		
		groupProduitRepository.delete(id);
	}

	@Override
	public List<GroupProduit> findAllOrdonly() {
		
		return groupProduitRepository.listeOrdonee();
	}

}
