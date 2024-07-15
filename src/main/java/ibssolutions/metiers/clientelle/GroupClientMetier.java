package ibssolutions.metiers.clientelle;

import java.util.List;

import ibssolutions.entity.clientelle.GroupClient;

public interface GroupClientMetier {

	public GroupClient  addGroupClient(GroupClient g);
	public GroupClient editeGroupClient(Long id);
	public void deleteGroupClient(Long id);
	
	public List<GroupClient> findAllGroupClient();
}
