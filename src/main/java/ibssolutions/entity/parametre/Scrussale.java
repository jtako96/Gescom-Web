package ibssolutions.entity.parametre;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@Table(name = "scrussales")
@Entity
public class Scrussale implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="pays", length = 101, nullable = false)
	private String pays;
	
	@Column(name="chiffre_affaire", length = 101, nullable = true)
	private double chiffreAffaire;

	@ManyToOne
	@JoinColumn(name="id_societe", nullable = false)
	private Societe societe;
	
	public Scrussale() {
		super();
	}

	public Scrussale(String pays, double chiffreAffaire) {
		super();
		this.pays = pays;
		this.chiffreAffaire = chiffreAffaire;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPays() {
		return pays;
	}

	public void setPays(String pays) {
		this.pays = pays;
	}

	public double getChiffreAffaire() {
		return chiffreAffaire;
	}

	public void setChiffreAffaire(double chiffreAffaire) {
		this.chiffreAffaire = chiffreAffaire;
	}

	public Societe getSociete() {
		return societe;
	}

	public void setSociete(Societe societe) {
		this.societe = societe;
	}
	
	
}
