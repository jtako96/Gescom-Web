package ibssolutions.metiersI.clientelle;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ibssolutions.dao.ClientRepository;
import ibssolutions.dao.CompteRepository;
import ibssolutions.dao.ParametreRepository;
import ibssolutions.dao.ScrussaleRepository;
import ibssolutions.dao.SousCompteRepository;
import ibssolutions.dao.UserRepository;
import ibssolutions.entity.clientelle.Client;
import ibssolutions.entity.comptabilite.Compte;
import ibssolutions.entity.comptabilite.SousCompte;
import ibssolutions.entity.parametre.Parametre;
import ibssolutions.entity.parametre.User;
import ibssolutions.metiers.clientelle.CLientMetier;
import ibssolutions.metiers.stockarticle.StockMetier;
import ibssolutions.utils.StringUtils;

@Service @Transactional
public class IClientMetier  implements CLientMetier{

	@Autowired
	ClientRepository clientRepository;

	@Autowired
	StockMetier stockMetier;
	
	@Autowired
	UserRepository userrep;
	
	@Autowired
	private SousCompteRepository sousCompteRepository;
	
	@Autowired
	private ParametreRepository parametreRepository; 
	
	@Autowired
	private CompteRepository compteRepository;
	
	@Autowired
	ScrussaleRepository scrussaleRepository;
	
	@Override
	public Client addClient(Client c) {

		Parametre p = parametreRepository.findByClient();
		c.setDateDebut(new Date());
		Client client = clientRepository.save(c);
		
		Compte cp = compteRepository.findOne(c.getCompte().getId());
		
		String matricule = StringUtils.genererCodeLogiciel(p.getValeur());
		
		System.out.println("SKKKKKKKKK: "+cp.getNumero());
		System.out.println("matricule: "+matricule);
       
		String s1 = Integer.toString(cp.getNumero());
		String str = s1 + matricule;
		 
		sousCompteRepository.save(new SousCompte(cp.getNumero(),
				Integer.parseInt(str), "C", client.getId(), "Compte Client", p.getValeur(), c.getCompte()));
		
		p.setValeur(p.getValeur() +1 );
		parametreRepository.save(p);
		
		return client;
	}
	
	@Override
	public Client updateClient(Client c) {

		Client client = clientRepository.save(c);
	
		
		return client;
	}

	@Override
	public Client saveClient(Client c, HttpSession httpSession) {
		
		Map<String, Object> recuperer = getScrussalelogger(httpSession);
	    User users = userrep.findOne(recuperer.get("username").toString());
	    c.setScrussale(scrussaleRepository.findOne((users.getIdScrussale())));
	    
	    return clientRepository.save(c);
	}

	@Override
	public Client editeClient(Long id) {
		
		return clientRepository.findOne(id);
	}

	@Override
	public void deleteClient(Long id) {
		
		
		Parametre p = parametreRepository.findByClient();
	
		sousCompteRepository.deleteByIndex(p.getValeur());
		p.setValeur(p.getValeur() - 1);
		parametreRepository.save(p);
		
		clientRepository.delete(id);
	}

	@Override
	public List<Client> findAllClient() {
		
		return clientRepository.listeOrdonee();
	}
	
	@Override
	public List<Client> findAllClientByScrussale( HttpSession httpSession) {
		
		Map<String, Object> recuperer = getScrussalelogger(httpSession);
	    User users = userrep.findOne(recuperer.get("username").toString());
	    
		return clientRepository.listeOrdoneeByScrussale(users.getIdScrussale());
	}
	
	public Map<String, Object> getScrussalelogger(HttpSession httpsession)
	{

		SecurityContext securityContext = (SecurityContext) httpsession.getAttribute("SPRING_SECURITY_CONTEXT");
		String username = securityContext.getAuthentication().getName();
		List<String> roles = new ArrayList<String>();

		for (GrantedAuthority ga : securityContext.getAuthentication().getAuthorities()) {

			roles.add(ga.getAuthority());

		}
		Map<String, Object> params = new HashMap<>();
		params.put("username", username);
		params.put("roles", roles);

		return params;

	}

	@Override
	public void activeClient(Long id) {
		
		Client c = clientRepository.findOne(id);
		c.setEtat(true);
	    clientRepository.save(c);
		
	}

	@Override
	public void desactiveClient(Long id) {
	
		Client c = clientRepository.findOne(id);
		c.setEtat(false);
	    clientRepository.save(c);
	}

}
