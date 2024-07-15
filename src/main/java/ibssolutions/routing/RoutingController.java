package ibssolutions.routing;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller
public class RoutingController {

	@GetMapping("/login")
	public String formlogin() {
	        return "login";
	}
 
	@GetMapping("/formperiodes")
	public String formmois() {
	        return "formperiode";
	}
	
	
	@GetMapping("/formfournisseurs")
	public String formfournisseur() {
	        return "formfournisseur";
	}
	
	@GetMapping("/formecritureperiode")
	public String formecritureperiode() {
	        return "formecritureperiode";
	}
	
	@GetMapping("/formentreestock")
	public String formentreestock() {
	        return "formentrestock";
	}
	
	
	@GetMapping("/formsocietes")
	public String formsocietes() {
	        return "formsociete";
	}
	
	@GetMapping("/formscrussales")
	public String formscrussales() {
	        return "formscrussale";
	        
	}
 
	@GetMapping("/formtvas")
	public String formtva() {
	        return "formtva";
	        
	}
	
	@GetMapping("/formreglements")
	public String formformreglement() {
	        return "formreglement";
	        
	}
	
	@RequestMapping (value="/monprofil",method=RequestMethod.GET)
	public String monprofil(){
		
	 
	return "profil";
		
	}

	@Secured(value = { "ROLE_Administrateur","ROLE_Administrateur2" })
	@RequestMapping (value="/monprofiladmin",method=RequestMethod.GET)
	public String monprofiladmin(){
		
	 
	return "profiladmin";
		
	}

	
	@Secured(value = { "ROLE_Administrateur","ROLE_Informatique" })
	@GetMapping("/formuser")
	public String formuser() {
	    	
	        return "formuser";
	}
	
	@GetMapping("/formtstatutcommandes")
	public String formtstatutcommande() {
	    	
	        return "formtstatutcommande";
	}
	
	@GetMapping("/formtstatutlivraisons")
    public String formtstatutlivraison() {
    	
        return "formtstatutlivraison";
    }
	  
	@GetMapping("/formbanques")
    public String formbanques() {
    	
        return "formbanque";
    }
	
    @GetMapping("/formtypes")
    public String plainPage() {
        return "formtypes";
    }

    @GetMapping("/formmagasins")
    public String pricingTables() {
        return "formmagasin";
    }
    
    @GetMapping("/formconditionnements")
    public String fromconditionnement() {
    	
        return "formconditionnement";
    }

    @GetMapping("/formannee")
    public String fromannee() {
    	
        return "formannee";
    }
    
    @GetMapping("/formperiode")
    public String fromperiode() {
    	
        return "formperiode";
    }
  
    @GetMapping("/formrole")
    public String fromrole() {
    	
        return "fromrole";
    }
    
    
    @GetMapping("/formgroups")
    public String formgroup() {
    	
        return "formgroup";
    }
    
    @GetMapping("/formproduits")
    public String formproduits() {
    	
        return "formproduit";
    }
    
    @GetMapping("/formsousgroups")
    public String formsousgroup() {
    	
        return "formsousgroup";
    }
    
    @GetMapping("/formcomptabilites")
    public String fromplans() {
    	
        return "formplans";
    }
    
    @GetMapping("/formarticles")
    public String formarticles() {
    	
        return "formarticle";
    }
    
    @GetMapping("/formstocks")
    public String formstock() {
    	
        return "formstock";
    }
 
    @GetMapping("/formgestionnaires")
    public String formgestionnaire() {
    	
        return "formgestionnaire";
    }
    
    @GetMapping("/formgroupclients")
    public String formgroupclient() {
    	
        return "formgroupclient";
    }
    
    @GetMapping("/formclients")
    public String formclient() {
    	
        return "formclient";
    }
    
    @GetMapping("/formcommerces")
    public String formcommerces() {
    	
        return "formcommerce";
    }
    
    @GetMapping("/formecritures")
    public String formecriture() {
    	
        return "formecriture";
    }
    
    @GetMapping("/formpasserecritures")
    public String formpasserecritures() {
    	
        return "formpasserecriture";
    }
    
    @GetMapping("/formventes")
    public String formvente() {
    	
        return "formventes";
    }
    
    @GetMapping("/formjournals")
    public String formjournal() {
    	
        return "formjournal";
    }
    
    @GetMapping("/formpieces")
    public String formpiece() {
    	
        return "formpiece";
    }
    
    @GetMapping("/formlivraisons")
    public String formlivraison() {
    	
        return "formlivraison";
    }
    
    @GetMapping("/formpaiements")
    public String formaiement() {
    	
        return "formpaiement";
    }
    
    
    @GetMapping("/forminventaires")
    public String forminventaire() {
    	
        return "forminventaire";
    }
    
    
    @GetMapping("/formvalidations")
    public String formvalidation() {
    	
        return "formvalidation";
    }
    
    @GetMapping("/formtypeprestations")
    public String formElementprestation() {
    	
        return "formElementprestation";
    }
    
    @GetMapping("/formprestations")
    public String formprestation() {
    	
        return "formprestation";
    }
    
  
    
    
	@GetMapping("/layout")
	public String login(HttpSession httpsession) {
		SecurityContext securityContext= (SecurityContext) httpsession.getAttribute("SPRING_SECURITY_CONTEXT");
		List<String> roles=new ArrayList<>();
		  for (GrantedAuthority ga:securityContext.getAuthentication().getAuthorities()){
				 roles.add(ga.getAuthority()); 
		  }
			if(roles.size()>1){
				return "roles";
			}else{

				// String liens = dataBaseRepository.findOne(1L).getLibelle();
				 SimpleDateFormat dateFormat = new SimpleDateFormat("ddMMyyyy");
							
							@SuppressWarnings("unused")
							Date date = new Date();
						
						try{
						    Runtime.getRuntime().exec(
								// 1 - La commande a exécuter (le shell), en séparant les paramètres :
								new String[] {
									"cmd.exe", // ou command.com sous Windows 9x
									"/C",
									"mysqldump.exe --user=root --password=2003@09071203 src_db > C:\\mybackup\\"+ dateFormat.format(new Date())+".sql" },
								// 2 - Les variables d'environnements (null = hérité du parent)
								null,
								// 3 - Le répertoire de travail
								//new File(liens)
								new File("C:\\wamp\\bin\\mysql\\mysql5.6.12\\bin\\")
								
								
							);
						        
						  
						  }catch(IOException e){ System.out.println("erreur"); }
						
				return "layout_"+roles.get(0);
			}
	}
	
	
	
	
	
	//LIEN POUR LE COMPTABLE
	
	

	@GetMapping("/formsocietescp")
	public String formsocietesCP() {
	        return "comptable/formsociete";
	}
	
	@GetMapping("/formscrussalescp")
	public String formscrussalesCP() {
	        return "comptable/formscrussale";
	        
	}
 
	@GetMapping("/formtvascp")
	public String formtvaCP() {
	        return "comptable/formtva";
	        
	}
	
	@GetMapping("/formreglementscp")
	public String formformreglementCP() {
	        return "comptable/formreglement";
	        
	}
	
	@GetMapping("/formtstatutcommandescp")
	public String formtstatutcommandeCP() {
	    	
	        return "comptable/formtstatutcommande";
	}
	
	@GetMapping("/formtstatutlivraisonscp")
    public String formtstatutlivraisonCP() {
    	
        return "comptable/formtstatutlivraison";
    }
	  
	@GetMapping("/formbanquescp")
    public String formbanquesCP() {
    	
        return "comptable/formbanque";
    }
	
    @GetMapping("/formtypescp")
    public String plainPageCP() {
        return "comptable/formtypes";
    }

    @GetMapping("/formmagasinscp")
    public String pricingTablesCP() {
        return "comptable/formmagasin";
    }
    
    @GetMapping("/formconditionnementscp")
    public String fromconditionnementCP() {
    	
        return "comptable/formconditionnement";
    }
    
    @GetMapping("/formgroupscp")
    public String formgroupCP() {
    	
        return "comptable/formgroup";
    }
    
    @GetMapping("/formproduitscp")
    public String formproduitsCP() {
    	
        return "comptable/formproduit";
    }
    
    @GetMapping("/formsousgroupscp")
    public String formsousgroupCP() {
    	
        return "comptable/formsousgroup";
    }
    
    
    @GetMapping("/formarticlescp")
    public String formarticlesCP() {
    	
        return "comptable/formarticle";
    }
    
    @GetMapping("/formstockscp")
    public String formstockCP() {
    	
        return "comptable/formstock";
    }
 
    @GetMapping("/formgestionnairescp")
    public String formgestionnaireCP() {
    	
        return "comptable/formgestionnaire";
    }
    
    @GetMapping("/formgroupclientscp")
    public String formgroupclientCP() {
    	
        return "comptable/formgroupclient";
    }
    
    @GetMapping("/formclientscp")
    public String formclientCP() {
    	
        return "comptable/formclient";
    }
    
    @GetMapping("/formcommercescp")
    public String formcommercesCP() {
    	
        return "comptable/formcommerce";
    }

    @GetMapping("/formventescp")
    public String formventeCP() {
    	
        return "comptable/formventes";
    }
    
    @GetMapping("/formlivraisonscp")
    public String formlivraisonCP() {
    	
        return "comptable/formlivraison";
    }
    
    @GetMapping("/formpaiementscp")
    public String formaiementCP() {
    	
        return "comptable/formpaiement";
    }
    
    
    @GetMapping("/formtypeprestationscp")
    public String formElementprestationCP() {
    	
        return "comptable/formElementprestation";
    }
    
    @GetMapping("/formprestationscp")
    public String formprestationCP() {
    	
        return "comptable/formprestation";
    }
    
}
