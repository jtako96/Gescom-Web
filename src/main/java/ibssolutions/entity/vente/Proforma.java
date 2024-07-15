package ibssolutions.entity.vente;

import java.io.Serializable;
import java.util.Date;

import ibssolutions.entity.clientelle.Client;
import ibssolutions.entity.parametre.Exercice;
import ibssolutions.entity.parametre.Scrussale;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class Proforma implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="code", length = 101, nullable = false)
	private String code;
	
	@Column(name="etat_facture", length = 1, nullable = false)
	private boolean etatFacture;
	
	@Column(name="date_proforma", length = 20, nullable = false)
	@Temporal(TemporalType.DATE)
	private Date dateProforma;
	
	@Column(name="date_livraison", length = 20, nullable = true)
	@Temporal(TemporalType.DATE)
	private Date dateLivraison;
	
	@Column(name="username", length = 101, nullable = true)
	private String username;
	
	@Column(name="modalite_paiement", length = 255, nullable = true)
	private String modalitePaiement;
	
	@Column(name="garantie", length = 255, nullable = true)
	private String garantie;
	
	@Column(name="delai_livraison", length = 255, nullable = true)
	private String delaiLivraison;
	
	@ManyToOne
	@JoinColumn(name = "id_scrussale" , nullable = false)
	private Scrussale scrussale;
	
	@ManyToOne
	@JoinColumn(name = "id_client" , nullable = false)
	private Client client;
	
	@ManyToOne
	@JoinColumn(name = "id_exercice" , nullable = false)
	private Exercice exercice;
	
	@Column(name="remise", length = 101, nullable = true)
	private double remise;
	
	@Column(name="montant_HT", length = 101, nullable = true)
	private double montantHT;
	
	@Column(name="montant_TVA", length = 101, nullable = true)
	private double montantTVA;
	
	@Column(name="montant_TTC", length = 101, nullable = true)
	private double montantTTC;
	
	@Column(name="montant_Remise", length = 101, nullable = true)
	private double montantRemise;


	public Proforma() {
		super();
		
	}

	public Proforma(String code, Date dateProforma, Date dateLivraison, String username, Scrussale scrussale,
			Client client, double montantHT, double montantTVA, double montantTTC, double montantRemise,
			double remise) {
		super();
		this.code = code;
		this.dateProforma = dateProforma;
		this.dateLivraison = dateLivraison;
		this.username = username;
		this.scrussale = scrussale;
		this.client = client;
		this.montantHT = montantHT;
		this.montantTVA = montantTVA;
		this.montantTTC = montantTTC;
		this.montantRemise = montantRemise;
		this.remise = remise;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public Date getDateProforma() {
		return dateProforma;
	}

	public void setDateProforma(Date dateProforma) {
		this.dateProforma = dateProforma;
	}

	public Date getDateLivraison() {
		return dateLivraison;
	}

	public void setDateLivraison(Date dateLivraison) {
		this.dateLivraison = dateLivraison;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Scrussale getScrussale() {
		return scrussale;
	}

	public void setScrussale(Scrussale scrussale) {
		this.scrussale = scrussale;
	}

	public Client getClient() {
		return client;
	}

	public void setClient(Client client) {
		this.client = client;
	}

	public double getMontantHT() {
		return montantHT;
	}

	public void setMontantHT(double montantHT) {
		this.montantHT = montantHT;
	}

	public double getMontantTVA() {
		return montantTVA;
	}

	public void setMontantTVA(double montantTVA) {
		this.montantTVA = montantTVA;
	}

	public double getMontantTTC() {
		return montantTTC;
	}

	public void setMontantTTC(double montantTTC) {
		this.montantTTC = montantTTC;
	}

	public double getMontantRemise() {
		return montantRemise;
	}

	public void setMontantRemise(double montantRemise) {
		this.montantRemise = montantRemise;
	}

	public double getRemise() {
		return remise;
	}

	public void setRemise(double remise) {
		this.remise = remise;
	}

	public boolean isEtatFacture() {
		return etatFacture;
	}

	public void setEtatFacture(boolean etatFacture) {
		this.etatFacture = etatFacture;
	}

	public String getModalitePaiement() {
		return modalitePaiement;
	}

	public void setModalitePaiement(String modalitePaiement) {
		this.modalitePaiement = modalitePaiement;
	}

	public String getGarantie() {
		return garantie;
	}

	public void setGarantie(String garantie) {
		this.garantie = garantie;
	}

	public String getDelaiLivraison() {
		return delaiLivraison;
	}

	public void setDelaiLivraison(String delaiLivraison) {
		this.delaiLivraison = delaiLivraison;
	}

	public Exercice getExercice() {
		return exercice;
	}

	public void setExercice(Exercice exercice) {
		this.exercice = exercice;
	}
	
	
}
