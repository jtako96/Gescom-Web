package ibssolutions.metiers.clientelle;

import java.util.List;

import javax.servlet.http.HttpSession;

import ibssolutions.entity.clientelle.Client;

public interface CLientMetier {

	public Client  addClient(Client c);
	public Client saveClient(Client c,HttpSession httpSession);
	public Client editeClient(Long id);
	public void deleteClient(Long id);
	public void activeClient(Long id);
	public void desactiveClient(Long id);
	
	public List<Client> findAllClient();
	List<Client> findAllClientByScrussale(HttpSession httpSession);
	Client updateClient(Client c);
}
