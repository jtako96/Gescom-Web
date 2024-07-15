package ibssolutions.entity.stockarticle;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity @Table(name="sous_group")
public class SousGroup implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
		
	@Column(name="libelle", length = 101, nullable = false)
	private String libelle;
	
	@ManyToOne
	@JoinColumn(name="id_group_produit", nullable = false)
	private GroupProduit groupProduit;

	public SousGroup() {
		super();
	}

	public SousGroup(Long id) {
		super();
		this.id = id;
	}

	public SousGroup(String libelle) {
		super();
		this.libelle = libelle;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLibelle() {
		return libelle;
	}

	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}

	public SousGroup(String libelle, GroupProduit groupProduit) {
		super();
		this.libelle = libelle;
		this.groupProduit = groupProduit;
	}

	public GroupProduit getGroupProduit() {
		return groupProduit;
	}

	public void setGroupProduit(GroupProduit groupProduit) {
		this.groupProduit = groupProduit;
	}


	
}
