
$script = <<-SCRIPT
sudo curl -sL https://deb.nodesource.com/setup_12.x | bash -
sudo apt update
sudo apt install -y vsftpd vim screen nodejs build-essential libssl-dev htop
sudo apt install -y apt-transport-https \
  ca-certificates \
  curl \
  gnupg2 \
  software-properties-common
sudo curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/debian \
   $(lsb_release -cs) \
   stable"
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io
sudo sed -i 's/#write_enable=YES/write_enable=YES/g' /etc/vsftpd.conf
sudo sed -i 's/#chroot_local_user=YES/chroot_local_user=YES/g' /etc/vsftpd.conf
echo 'allow_writeable_chroot=YES' >> /etc/vsftpd.conf
echo "/usr/sbin/nologin" >> /etc/shells
sudo systemctl restart vsftpd.service
#sudo useradd -m -s /usr/sbin/nologin bob
#sudo echo bob:123 | chpasswd
SCRIPT

Vagrant.configure("2") do |config|
  config.vm.box = "bento/debian-9.8"
  config.vm.box_version = "201906.17.0"
  config.vm.provider :virtualbox do |vb|
    # vb.customize ['modifyvm', :id,'--memory', '2048']
    vb.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
    vb.customize ["modifyvm", :id, "--natdnsproxy1", "on"]
    vb.customize ["modifyvm", :id, "--ioapic", "on"]
    vb.memory = 4096
    vb.cpus = 4
  end
  config.vm.network "private_network", ip: "172.30.1.5"
  config.vm.provision "shell", inline: $script
  config.vm.synced_folder ".", "/root/app"
end