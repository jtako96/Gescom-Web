package ibssolutions.entity.clientelle;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import ibssolutions.entity.comptabilite.Compte;
import ibssolutions.entity.parametre.Scrussale;

@Entity @Table(name="client_ibss")
public class Client implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
		
	@Column(name="raison_sociale", length = 101, nullable = false)
	private String raisonSocial;
	
	@Column(name="representant", length = 101, nullable = true)
	private String representant;
	
	@Column(name="num_compte", length = 101, nullable = true)
	private String numCompte;
	
	@Column(name="solde_debiteur", nullable = true)
	private double soldeDebiteur;
	
	@Column(name="solde_crediteur", nullable = true)
	private double soldeCrediteur;

	@Column(name="adresse", length = 101, nullable = true)
	private String adresse;
	
	@Column(name="bpostale", length = 101, nullable = true)
	private String bPostale;
	
	@Column(name="contact", length = 101, nullable = true)
	private String contact;
	
	@Column(name="email", length = 101, nullable = true)
	private String email;
	
	@Column(name="date_debut", length = 20, nullable = false)
	@Temporal(TemporalType.DATE)
	private Date dateDebut;
	
	@Column(name="date_Fin", length = 20, nullable = true)
	@Temporal(TemporalType.DATE)
	private Date dateFin;
	
	@Column(name="etat", length = 1, nullable = true)
	private boolean etat;
	
	@ManyToOne
	@JoinColumn(name="id_gestionnaire", nullable = false)
	private Gestionnaire gestionnaire;
	
	@ManyToOne
	@JoinColumn(name="id_group_client", nullable = false)
	private GroupClient groupClient;
	
	@ManyToOne
	@JoinColumn(name="id_scrussale", nullable = false)
	private Scrussale scrussale;

	@ManyToOne
	@JoinColumn(name = "id_compte" , nullable = false)
	private Compte compte;
	
	public Client() {
		super();
	}

	public Client(Long id) {
		super();
		this.id = id;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getRaisonSocial() {
		return raisonSocial;
	}

	public void setRaisonSocial(String raisonSocial) {
		this.raisonSocial = raisonSocial;
	}

	public String getRepresentant() {
		return representant;
	}

	public void setRepresentant(String representant) {
		this.representant = representant;
	}

	public String getNumCompte() {
		return numCompte;
	}

	public void setNumCompte(String numCompte) {
		this.numCompte = numCompte;
	}

	public double getSoldeDebiteur() {
		return soldeDebiteur;
	}

	public void setSoldeDebiteur(double soldeDebiteur) {
		this.soldeDebiteur = soldeDebiteur;
	}

	public double getSoldeCrediteur() {
		return soldeCrediteur;
	}

	public void setSoldeCrediteur(double soldeCrediteur) {
		this.soldeCrediteur = soldeCrediteur;
	}

	public String getAdresse() {
		return adresse;
	}

	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}

	public String getbPostale() {
		return bPostale;
	}

	public void setbPostale(String bPostale) {
		this.bPostale = bPostale;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Date getDateDebut() {
		return dateDebut;
	}

	public void setDateDebut(Date dateDebut) {
		this.dateDebut = dateDebut;
	}

	public Date getDateFin() {
		return dateFin;
	}

	public void setDateFin(Date dateFin) {
		this.dateFin = dateFin;
	}

	public boolean isEtat() {
		return etat;
	}

	public void setEtat(boolean etat) {
		this.etat = etat;
	}

	public Gestionnaire getGestionnaire() {
		return gestionnaire;
	}

	public void setGestionnaire(Gestionnaire gestionnaire) {
		this.gestionnaire = gestionnaire;
	}

	public GroupClient getGroupClient() {
		return groupClient;
	}

	public void setGroupClient(GroupClient groupClient) {
		this.groupClient = groupClient;
	}

	public Compte getCompte() {
		return compte;
	}

	public void setCompte(Compte compte) {
		this.compte = compte;
	}

	public Scrussale getScrussale() {
		return scrussale;
	}

	public void setScrussale(Scrussale scrussale) {
		this.scrussale = scrussale;
	}

	
	
}
