
$script = <<-SCRIPT
sudo apt install -y vsftpd vim
sudo sed -i 's/#write_enable=YES/write_enable=YES/g' /etc/vsftpd.conf
sudo sed -i 's/#chroot_local_user=YES/chroot_local_user=YES/g' /etc/vsftpd.conf
echo 'allow_writeable_chroot=YES' >> /etc/vsftpd.conf
echo "/usr/sbin/nologin" >> /etc/shells
sudo systemctl restart vsftpd.service
sudo useradd -m -s /usr/sbin/nologin bob
sudo echo bob:123 | chpasswd
SCRIPT

Vagrant.configure("2") do |config|
  config.vm.box = "bento/debian-9.8-i386"
  config.vm.box_version = "201906.17.0"
  config.vm.network "private_network", ip: "172.30.1.5"
  config.vm.provision "shell", inline: $script
end