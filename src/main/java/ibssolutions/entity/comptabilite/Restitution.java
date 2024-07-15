package ibssolutions.entity.comptabilite;

public class Restitution {
	
	private String nom;
	private String rubrique;
	private double montanApay;
	private double montanpay;
	private double montanRestant;
	private String contact;

	public Restitution(String nom, String rubrique, double montanApay, double montanpay, double montanRestant,
			String contact) {
		super();
		this.nom = nom;
		this.rubrique = rubrique;
		this.montanApay = montanApay;
		this.montanpay = montanpay;
		this.montanRestant = montanRestant;
		this.contact = contact;
	}
	
	
	public Restitution(String nom, String rubrique, double montanApay, double montanpay, double montanRestant) {
		super();
		this.nom = nom;
		this.rubrique = rubrique;
		this.montanApay = montanApay;
		this.montanpay = montanpay;
		this.montanRestant = montanRestant;
	}
	public Restitution() {
		super();
	}
	
	public String getContact() {
		return contact;
	}
	
	
	public void setContact(String contact) {
		this.contact = contact;
	}
	
	
	public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public String getRubrique() {
		return rubrique;
	}
	public void setRubrique(String rubrique) {
		this.rubrique = rubrique;
	}
	public double getMontanApay() {
		return montanApay;
	}
	public void setMontanApay(double montanApay) {
		this.montanApay = montanApay;
	}
	public double getMontanpay() {
		return montanpay;
	}
	public void setMontanpay(double montanpay) {
		this.montanpay = montanpay;
	}
	public double getMontanRestant() {
		return montanRestant;
	}
	public void setMontanRestant(double montanRestant) {
		this.montanRestant = montanRestant;
	}
	

}
