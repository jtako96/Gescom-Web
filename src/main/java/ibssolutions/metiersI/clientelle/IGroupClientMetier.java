package ibssolutions.metiersI.clientelle;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ibssolutions.dao.GroupClientRepository;
import ibssolutions.entity.clientelle.GroupClient;
import ibssolutions.metiers.clientelle.GroupClientMetier;

@Service @Transactional
public class IGroupClientMetier implements GroupClientMetier{

	@Autowired
	GroupClientRepository groupClientRepository;

	
	@Override
	public GroupClient addGroupClient(GroupClient g) {
		
		return groupClientRepository.save(g);
	}

	@Override
	public GroupClient editeGroupClient(Long id) {
		
		return groupClientRepository.findOne(id);
	}

	@Override
	public void deleteGroupClient(Long id) {
		
		groupClientRepository.delete(id);
	}

	@Override
	public List<GroupClient> findAllGroupClient() {
		
		return groupClientRepository.listeOrdonee();
	}

}
