package ibssolutions.web.controllers;
 

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.github.royken.converter.FrenchNumberToWords;
import com.google.protobuf.TextFormat.ParseException;

import ibssolutions.dao.DetailPrestationRepository;
import ibssolutions.dao.DetailProformaRepository;
import ibssolutions.dao.PanierRepository;
import ibssolutions.dao.PrestationRepository;
import ibssolutions.dao.ProformaRepository;
import ibssolutions.dao.ReglementRepository;
import ibssolutions.dao.VenteRepository;
import ibssolutions.entity.comptabilite.Reglement;
import ibssolutions.entity.vente.DetailPrestation;
import ibssolutions.entity.vente.DetailProforma;
import ibssolutions.entity.vente.Panier;
import ibssolutions.entity.vente.Vente;
import ibssolutions.metiers.comptabilite.ReglementMetier;


@RestController
@RequestMapping("api/etat")         
public class PrintController {

	@Autowired
	public DetailProformaRepository detailProformaRepository;

	@Autowired
	VenteRepository venteRepository;
	
	@Autowired
	ReglementRepository reglementRepository;
	
	@Autowired
	ReglementMetier ireglementMetier;
	
	@Autowired
	PanierRepository panierRepository;
	
	@Autowired
	ProformaRepository proformaRepository;

	@Autowired
	PrestationRepository prestationRespository;
	
	@Autowired
	DetailPrestationRepository detailPrestationRepository;
	
	@PersistenceContext
	private EntityManager em ;
	
	@Value("${images.dir}")
	private String imagedir;


/* Proforma avec images */
	
	@GetMapping("/proforma")          
	public ModelAndView proformaImage( Long id, ModelAndView P)
	{
		
		List<DetailProforma> data = detailProformaRepository.findAllBy(id);
		 String convert = StringUtils.capitalize(FrenchNumberToWords.convert((long) detailProformaRepository.findOne(id).getMontantTTC()));
		P.addObject("imagedir",imagedir);
		P.addObject("imagefooter",imagedir);
		P.addObject("datasource",data);
		P.addObject("montantTTC",ibssolutions.utils.StringUtils.capitalize(convert)+" Francs CFA");
		P.addObject("modalite",detailProformaRepository.findOne(id).getProforma().getModalitePaiement());
		P.addObject("garantie",detailProformaRepository.findOne(id).getProforma().getGarantie());
		P.addObject("delai",detailProformaRepository.findOne(id).getProforma().getDelaiLivraison());
		P.addObject("format","pdf");
		P.setViewName("report_proforma");	
	
		return P;
	
	}
	
/* Proforma sans images */
	
	@GetMapping("/proforma/all")          
	public ModelAndView proformaAll( Long id, ModelAndView P)
	{
		
		List<DetailProforma> data = detailProformaRepository.findAllByProforma(id);
		 String convert = StringUtils.capitalize(FrenchNumberToWords.convert((long) proformaRepository.findOne(id).getMontantTTC()));
		P.addObject("imagedir",imagedir);
		P.addObject("imagefooter",imagedir);
		P.addObject("datasource",data);
		P.addObject("totalLettre",ibssolutions.utils.StringUtils.capitalize(convert)+" Francs CFA");
		P.addObject("modalite",proformaRepository.findOne(id).getModalitePaiement());
		P.addObject("garantie",proformaRepository.findOne(id).getGarantie());
		P.addObject("delai",proformaRepository.findOne(id).getDelaiLivraison());
		P.addObject("format","pdf");
		P.setViewName("report_proforma2");	
	
		return P;
	
	}
	
/* Facture clients avec images */
	
	@GetMapping("/facture")          
	public ModelAndView facture( Long id, ModelAndView P)
	{
		
		List<Panier> data = panierRepository.findFacture(id);
		 String convert = StringUtils.capitalize(FrenchNumberToWords.convert((long) venteRepository.findOne(id).getMontantTTC()));
		P.addObject("imagedir",imagedir);
		P.addObject("imagefooter",imagedir);
		P.addObject("datasource",data);
		P.addObject("totalLettre",ibssolutions.utils.StringUtils.capitalize(convert)+" Francs CFA");
		P.addObject("modalite",venteRepository.findOne(id).getModalitePaiement());
		P.addObject("garantie",venteRepository.findOne(id).getGarantie());
		P.addObject("delai",venteRepository.findOne(id).getDelaiLivraison());
		P.addObject("format","pdf");
		P.setViewName("report_facture_prestation");	
	
		return P;
	
	}
	
	
	
/* Facture PRESTATION avec images */
	
	@GetMapping("/facture/prestation")          
	public ModelAndView facturePrestation( Long id, ModelAndView P)
	{
		
		List<DetailPrestation> data = detailPrestationRepository.findAllByPrestation(id);
		
		String convert = StringUtils
				.capitalize(FrenchNumberToWords.convert((long) prestationRespository.findOne(id).getMontantTTC()));
		
		P.addObject("imagedir",imagedir);
		P.addObject("imagefooter",imagedir);
	
		P.addObject("datasource",data);
		P.addObject("totalLettre",ibssolutions.utils.StringUtils.capitalize(convert)+" Francs CFA");
		P.addObject("modalite",prestationRespository.findOne(id).getModalitePaiement());
		P.addObject("garantie",prestationRespository.findOne(id).getGarantie());
		P.addObject("delai",prestationRespository.findOne(id).getDelaiLivraison());
		P.addObject("format","pdf");
		P.setViewName("report_facture_prestation");	
	
		return P;
	
	}
	
	
	
/* Facture PRESTATION avec images */
	
	@GetMapping("/facture/prestation2")          
	public ModelAndView facturePrestation2( Long id, ModelAndView P)
	{
		
		List<DetailPrestation> data = detailPrestationRepository.findAllByPrestation(id);
		
		String convert = StringUtils
				.capitalize(FrenchNumberToWords.convert((long) prestationRespository.findOne(id).getMontantTTC()));
		
		P.addObject("imagedir",imagedir);
		P.addObject("imagefooter",imagedir);
	
		P.addObject("datasource",data);
		P.addObject("totalLettre",ibssolutions.utils.StringUtils.capitalize(convert)+" Francs CFA");
		P.addObject("modalite",prestationRespository.findOne(id).getModalitePaiement());
		P.addObject("garantie",prestationRespository.findOne(id).getGarantie());
		P.addObject("delai",prestationRespository.findOne(id).getDelaiLivraison());
		P.addObject("format","pdf");
		P.setViewName("report_facture_prestation2");	
	
		return P;
	
	}
	
	
	
	
	
	/* RECU clients avec images */
	
	@GetMapping(value = "impressionrecu")
	public  ModelAndView impressionrub(Long id1,String date,ModelAndView m,HttpSession httpSession) throws java.text.ParseException {
		
		
	    SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
	    Date dateObj = sdf.parse(date);
		
	    			Vente v = venteRepository.findOne(id1);
				   java.util.Vector collection = new java.util.Vector();
				   List<Reglement> payrecu = reglementRepository.payementrecu(dateObj,  v.getClient().getId());
				 
				   SecurityContext securityContext = (SecurityContext) httpSession.getAttribute("SPRING_SECURITY_CONTEXT");
					String auteurs = securityContext.getAuthentication().getName();
					//User auteur = userrep.nomUser(auteurs);
				  
				   
				   
				   double montantot=0;
				   String numerorecu = null;
				   int i=1;
					   
				   for (Reglement pay: payrecu) {
					  // auteur=pay.get;
					   montantot = montantot+pay.getMontantPayement();
					   
					  if (i==1){
						  numerorecu=   pay.getId().toString(); 
					   }else{
						   numerorecu=numerorecu+"-"+pay.getId();
					   }
					   
					  
					  
					  //Long  id2=pay.getFraisParcours().getMotif().getIdMotifRecouvrement();
					 /////////////////////////////////
					 
					
					  Integer t =  reglementRepository.montantpaye(id1);
					
					    double apayer = ireglementMetier.renvoieMontantApayer(v.getId());
					 
						double payer = reglementRepository.totalpayerecu(id1);
						
						double rpayer = apayer - payer;
						
						Map<String, Double> params = new HashMap<>();
						Map<String, String> paramspay = new HashMap<>();
						
						paramspay.put("codePay",Long.toString(pay.getId()));
						paramspay.put("montant", Double.toString(pay.getMontantPayement()));
						paramspay.put("rubrique", "Payement de la facture "+v.getCode());
					 
				 		
						Map<String,Object> params2 = new HashMap<>();
						
						
						params.put("apayer", apayer);
						params.put("payer", payer);
						params.put("rpayer", rpayer);
				  		params2.put("Payement",paramspay);
						params2.put("situation",params);
                	    collection.add(params2);
                	    i=i+1;
	 			
				 } 
				   
				   
				  
		
				   m.addObject("datasource",collection);
				   m.addObject("eleve",v.getClient().getRaisonSocial());
				   m.addObject("annee",v.getExercice().getLibelle());
				  // m.addObject("classe",inscriptionRep.findOne(id1).getParcours().getIntituleParcours());
				   m.addObject("date",date);
				   m.addObject("auteur","CoMP");
				   m.addObject("imagedir", imagedir);
				   m.addObject("totrecuenlettre","ffff");
				   m.addObject("numerorecu","N°: "+numerorecu);
				   m.addObject("format", "pdf");
				   m.setViewName("report_recu");

				 return m;
		}
	








}